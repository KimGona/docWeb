import React, { useState } from "react";
import GreenBackground from "../resources/green-background.png";
import InputField from "../components/InputField";
import Button from "../components/Button";
import TranslateAlert from "../components/alerts/TranslateAlert";


export default function RegisterAdmin({ }) {
    const [confirmPassword, setConfirmPassword] = useState("");

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

    const [data, setData] = useState({
        username: "",
        password: "",
        role: "ADMIN",
    });

    const resetData = () => {
        setData({
            username: "",
            password: "",
            role: "ADMIN",
        })
        setConfirmPassword("")
    }

    function onDataChange(e, type) {
        let newObject = { ...data };
        newObject[type] = e.target.value;
        setData(newObject);
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

    const onCreateAccount = async (event) => {
        event.preventDefault();
        resetResult();

        if (data.password != confirmPassword) {
            setAlert("error", "Passwords don't match.");
            return;
        } else if (data.password.length < 4) {
            setAlert("error", "Password should be at least 8 characters long.");
            return;
        }

        try {
            let requestBody = JSON.stringify(data);

            let res = await fetch('http://localhost:8080/users/admin', {
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
                resetData()
                setAlert("success", "Successfully created new account.");
            } else {
                console.log("create account failed")
                setAlert("error", "Could not create new account.");
            }
        } catch (error) {
            console.log(error);
            setAlert("error", "Could not create new account.");
        }
    }

    return (
        <div className="w-full flex flex-col items-start ">
            <img className="absolute object-contain" src={GreenBackground} alt="radio button" />
            <div className="relative w-full h-screen flex justify-center align-middle items-center">
                <div className="flex flex-col justify-center items-center space-y-6">
                    <TranslateAlert isVisible={result.isVisible} type={result.value} message={result.message} onClose={resetResult} />
                    <div className="relative px-12 py-10 bg-white flex flex-col justify-center items-center space-y-6">
                        <p className="text-3xl font-bold text-greenPrimary">Register admin</p>

                        <div>
                            <p>Username</p>
                            <InputField value={data.username} onValueChange={(e) => onDataChange(e, "username")} />
                        </div>

                        <div>
                            <p>Password</p>
                            <InputField type="password" value={data.password} onValueChange={(e) => onDataChange(e, "password")} />
                        </div>

                        <div>
                            <p>Confirm Password</p>
                            <InputField type="password" value={confirmPassword} onValueChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>

                        <div className="pt-10">
                            <Button color="pink xl" label="Create account" onClick={onCreateAccount} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}