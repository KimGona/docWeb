import React, { useState, useEffect } from "react";
import GreenBackground from "../resources/green-background.png";
import Button from "../components/Button";
import InputFieldWithTitle from "../components/InputFieldWithTitle";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers';
import RadioButtonGenderList from "../components/RadioButtonGender";
import TranslateAlert from "../components/alerts/TranslateAlert";

export default function Signup({ }) {
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
        role: "PATIENT",
        patient: {
            name: "",
            surname: "",
            dateOfBirth: "",  //yyyy-MM-dd
            gender: "female",
            address: {
                street: "",
                streetNumber: 0,
                city: "",
                code: "",
            },
        },
    })

    const resetData = () => {
        setData({
            username: "",
            password: "",
            role: "PATIENT",
            patient: {
                name: "",
                surname: "",
                dateOfBirth: "",  // yyyy-MM-dd
                gender: "female",
                address: {
                    street: "",
                    streetNumber: 0,
                    city: "",
                    code: "",
                },
            },
        })
        setConfirmPassword("")
    }

    function onDataChange(e, type) {
        let newObject = { ...data };
        newObject[type] = e.target.value;
        setData(newObject);
    }

    function onPatientChange(e, type) {
        let newObject = { ...data };
        newObject["patient"][type] = e.target.value;
        setData(newObject);
    }

    function onGenderChange(e) {
        console.log(e);
        let newObject = { ...data };
        newObject.patient.gender = e;
        setData(newObject);
    }

    function onAddressChange(e, type) {
        let newObject = { ...data };
        newObject["patient"]["address"][type] = e.target.value;
        setData(newObject);
    }

    function onStreetNumberChange(e) {
        let newObject = { ...data };
        newObject.patient.address.streetNumber = parseInt(e.target.value, 10);
        setData(newObject);
    }

    function onBirthDateChange(e) {
        console.log(e);
        let newObject = { ...data };
        newObject.patient.dateOfBirth = e;
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

            let res = await fetch('http://localhost:8080/users/patient', {
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="w-full flex flex-col items-start ">
                <img className="absolute object-contain" src={GreenBackground} />
                <div className="relative w-full h-screen flex justify-center align-middle items-center">
                    <div>
                    <TranslateAlert isVisible={result.isVisible} type={result.value} message={result.message} onClose={resetResult} />
                    <div className="relative px-12 py-12 bg-white flex flex-col justify-center items-center space-y-10">
                        <p className="text-3xl font-bold">Sign up</p>

                        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                            <InputFieldWithTitle title="Name" value={data.patient.name} onValueChange={(e) => onPatientChange(e, "name")} />
                            <InputFieldWithTitle title="Surname" value={data.patient.surname} onValueChange={(e) => onPatientChange(e, "surname")} />
                            <InputFieldWithTitle title="Street" value={data.patient.address.street} onValueChange={(e) => onAddressChange(e, "street")} />
                            <InputFieldWithTitle title="Street number" type="number" value={data.patient.address.streetNumber} onValueChange={(e) => onStreetNumberChange(e)} />
                            <InputFieldWithTitle title="City" value={data.patient.address.city} onValueChange={(e) => onAddressChange(e, "city")} />
                            <InputFieldWithTitle title="Code" value={data.patient.address.code} onValueChange={(e) => onAddressChange(e, "code")} />
                            <div>
                                <p className="pb-2">Gender</p>
                                <RadioButtonGenderList chosenValue={data.patient.gender} onButtonChosen={(e) => onGenderChange(e)} />
                            </div>
                            <div className="pt-2">
                                <p className="pb-2">Birth date</p>
                                <DateField
                                    label="Date picker"
                                    value={data.patient.dateOfBirth}
                                    onChange={(e) => onBirthDateChange(e)}
                                    format="YYYY-MM-DD"
                                />
                            </div>

                            <InputFieldWithTitle title="Username" value={data.username} onValueChange={(e) => onDataChange(e, "username")} />
                            <div></div>
                            <InputFieldWithTitle title="Password" type="password"value={data.password} onValueChange={(e) => onDataChange(e, "password")} />
                            <InputFieldWithTitle title="Confirm password" type="password" value={confirmPassword} onValueChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>

                        <Button color="pink xl" label="Create account" onClick={onCreateAccount}/>
                    </div>
                    </div>
                </div>
            </div>
        </LocalizationProvider>
    );
}