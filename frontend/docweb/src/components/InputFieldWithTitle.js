import React, { useState } from "react";
import InputField from "../components/InputField";

export default function InputFieldWithTitle({value, type, onValueChange, title, description="", pattern, width, isError, errorMessage}) {
    return (
        <div className="space-y-2">
            <div>
            <p className="text-lg font-semibold">{title}</p>
            <p className="text-md font-normal text-gray-500">{description}</p>
            </div>
            <InputField type={type} value={value} onValueChange={onValueChange} patter={pattern} width={width} isError={isError} errorMessage={errorMessage} />
        </div>
    );
}