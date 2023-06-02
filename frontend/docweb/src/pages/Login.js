import React, { useState } from "react";
import GreenBackground from "../resources/green-background.png";
import InputField from "../components/InputField";
import Button from "../components/Button";
import HorizontalLineWithText from "../components/HorizontalLineWithText";
import { useNavigate } from "react-router-dom";


export default function Login({ onUserChange, onUserIdChange }) {
    const navigate = useNavigate();

    const openSignUp = () => {
        navigate('/sign_up')
        window.location.reload();
    }

    const [data, setData] = useState({
        username: "",
        password: ""
    })

    function onUsernameChange(e) {
        let newObject = { ...data };
        newObject.username = e.target.value;
        setData(newObject);
    }

    function onPasswordChange(e) {
        let newObject = { ...data };
        newObject.password = e.target.value;
        setData(newObject);
    }

    let onLogin = async (event) => {
        console.log("on login clicked")
        event.preventDefault();
        try {
            let formData = new FormData();
            formData.append('username', data.username);
            formData.append('password', data.password);

            let res = await fetch('http://localhost:8080/login', {
                method: 'POST',
                body: formData,
                credentials: 'include',
                mode: 'cors',
                referrerPolicy: 'no-referrer',
                origin: "http://localhost:3000/",
            });

            if (res.status === 200) {
                console.log("login succeeded");
                setData({
                    username: "",
                    password: "",
                });

                let userRole = await fetch('http://localhost:8080/users/role', {
                    method: 'GET',
                    credentials: 'include',
                    mode: 'cors',
                    referrerPolicy: 'no-referrer',
                    origin: "http://localhost:3000/",
                });

                if (userRole.status === 200) {
                    let role = await userRole.text();
                    navigate("/");
                    onUserChange(role);
                } else {
                    console.log("user role failed, status: " + userRole.status);
                    // onError();
                }

                // let userId = await fetch('http://localhost:8080/user/employee', {
                //     method: 'GET',
                //     credentials: 'include',
                //     mode: 'cors',
                //     referrerPolicy: 'no-referrer',
                //     origin: "http://localhost:3000/",
                // });

                // if (userId.status === 200) {
                //     let id = await userId.text();
                //     console.log("userId");
                //     console.log(id);
                //     onUserIdChange(id);
                // }
            } else {
                console.log("login failed");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-full flex flex-col items-start ">
            <img className="absolute object-contain" src={GreenBackground} alt="radio button" />
            <div className="relative w-full h-screen flex justify-center align-middle items-center">
                <div className="relative px-8 py-10 bg-white flex flex-col justify-center items-center space-y-10">
                    <p className="text-3xl font-bold">Login</p>

                    <div className="flex flex-col justify-center items-center space-y-10">
                        <div>
                            <p>Username</p>
                            <InputField value={data.username} onValueChange={(e) => onUsernameChange(e)} />
                        </div>

                        <div>
                            <p>Password</p>
                            <InputField value={data.password} onValueChange={(e) => onPasswordChange(e)} />
                        </div>
                    </div>

                    <Button color="pink xl" label="Login" onClick={onLogin} />
                    <div className="pt-5">
                        <HorizontalLineWithText />
                    </div>
                    <Button color="green outline xl" label="Create account" onClick={openSignUp} />
                </div>
            </div>
        </div>
    );
}