import React, { useState } from "react";
import GreenBackground from "../resources/green-background.png";
import Button from "../components/Button";
import InputFieldWithTitle from "../components/InputFieldWithTitle";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';


export default function Signup({}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="w-full flex flex-col items-start ">
            <img className="absolute object-contain" src={GreenBackground} />
            <div className="relative w-full h-screen flex justify-center align-middle items-center">
                <div className="relative px-12 py-12 bg-white flex flex-col justify-center items-center space-y-10">
                    <p className="text-3xl font-bold">Sign up</p>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                        <InputFieldWithTitle title="Name" />
                        <InputFieldWithTitle title="Surname" />
                        <div className="flex flex-row gap-4 items-center justify-center">
                            {/* TODO: as date picker */}
                            <div className="pt-2">
                                <p className="pb-2">Birth date</p>
                                <DatePicker
                                    label="Date picker"
                                    // value={value}
                                    // onChange={(newValue) => setValue(newValue)}
                                />
                            </div>
                            {/* TODO: as Dropdown */}
                            <InputFieldWithTitle title="Gender" width="w-[50px]" />

                        </div>
                        <InputFieldWithTitle title="Address" />
                        <InputFieldWithTitle title="Username" />
                        <div></div>
                        <InputFieldWithTitle title="Password" />
                        <InputFieldWithTitle title="Confirm password" />
                    </div>
        
                    <Button color="pink xl" label="Create account" />
                </div>
            </div>
        </div>
        </LocalizationProvider>
    );
}