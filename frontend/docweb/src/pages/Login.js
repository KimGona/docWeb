import React, { useState } from "react";
import GreenBackground from "../resources/green-background.png";
import InputField from "../components/InputField";
import Button from "../components/Button";
import HorizontalLineWithText from "../components/HorizontalLineWithText";


export default function Login({}) {
    return (
        <div className="w-full flex flex-col items-start ">
            <img className="absolute object-contain" src={GreenBackground} alt="radio button" />
            <div className="relative w-full h-screen flex justify-center align-middle items-center">
                <div className="relative px-8 py-10 bg-white flex flex-col justify-center items-center space-y-10">
                    <p className="text-3xl font-bold">Login</p>

                    <div>
                        <p>Username</p>
                        <InputField />
                    </div>

                    <div>
                        <p>Password</p>
                        <InputField />
                    </div>

                    <Button color="pink xl" label="Login" />
                    <div className="pt-5">
                        <HorizontalLineWithText />
                    </div>
                    <Button color="green outline xl" label="Create account" />
                </div>
            </div>
        </div>
    );
}