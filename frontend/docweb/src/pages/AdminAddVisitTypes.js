import React, { useState, useEffect } from "react";
import PageContainer from "../components/PageContainer";
import RegisteredAccount from "../components/RegisteredAccount";
import Button from "../components/Button";
import InputField from "../components/InputField";
import TranslateAlert from "../components/alerts/TranslateAlert";
import TextField from "../components/TextField";

function Content(list) {
    if (list.length <= 0) {
        return (
            <div className="flex flex-col space-y-10 w-1/2">
                <p className="text-gray-700 text-xl font-thin">There are no registered accounts. Please add at least one.</p>
            </div>
        );
    } else {
        return (
            list.map(it =>
                <TextField key={it.description} text={it.description}/>
            )
        );
    }
}

export default function AdminAddVisitTypes() {
    const [visitTypes, setVisitTypes] = useState([]);
    const [data, setData] = useState({
        description: ""
    });

    const [isShown, setIsShown] = useState(false);

    useEffect(()=>{
        getVisitTypes();
        setIsShown(true);
    },[isShown])

    const onDataChange = (e) => {
        let newObject = { ...data };
        newObject.description = e.target.value;
        setData(newObject);
    }

    const [result, setResult] = useState({
        value: "",  // 'success' or 'error'
        isVisible: false,
        message: "",
    });

    const onResultChange = (obj) => setResult(obj);
    const resetResult = () => {
        let obj = {
            value: "",
            isVisible: false,
            message: "",
        };
        onResultChange(obj);
    }

    function getResult(type, message) {
        let obj = {
            value: type,
            isVisible: true,
            message: message
        };
        return obj;
    }

    const setAlert = (type, isVisible, message) => {
        onResultChange(getResult(type, isVisible, message));
    }

    let getVisitTypes = async() => {
        try {
            let res = await fetch('http://localhost:8080/visit-types', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                mode: 'cors',
                referrerPolicy: 'no-referrer',
                origin: "http://localhost:3000/",
            });

            if (res.status === 200) {
                console.log("get visit types succeeded");
                let list = await res.json();
                console.log(list);
                setVisitTypes(list);
            } else {
                console.log("get visit types failed");
                setAlert("error", "Could not get visit types.");
            }
        } catch (error) {
            console.log(error);
            setAlert("error", "Could not get visit types.");
        }
    }

    let postVisitTypes = async (event) => {
        event.preventDefault();
        try {
            let requestBody = JSON.stringify(data);

            let res = await fetch('http://localhost:8080/visit-types', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: requestBody,
                credentials: 'include',
                mode: 'cors',
                referrerPolicy: 'no-referrer',
                origin: "http://localhost:3000/",
            });

            if (res.status === 200) {
                console.log("post visit types succeeded");
                setData({
                    description: "",
                });
                setIsShown(false);
                setAlert("error", "Successfully added new visit type.");
            } else {
                console.log("post visit types failed");
                setAlert("error", "Could not save new visit type.");
            }
        } catch (error) {
            console.log(error);
            setAlert("error", "Could not save new visit type.");
        }
    }

    return (
        <PageContainer title="Registered accounts">
            <div className="flex flex-col space-y-10 w-1/2">
                <TranslateAlert isVisible={result.isVisible} type={result.value} message={result.message} onClose={resetResult} />
                <div className="flex flex-col space-y-6">
                    <p className="text-xl font-semibold">Add new visit type</p>
                    <InputField value={data.description} onValueChange={(e) => onDataChange(e)} />
                    <Button color="pink big" label="Submit visit type" onClick={postVisitTypes}/>
                </div>
                {Content(visitTypes)}
            </div>
        </PageContainer>
    );
}