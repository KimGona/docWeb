import React, { useState } from "react";
import InputField from "../components/InputField";

export default function InputFieldWithTitle({title, width, isError, errorMessage}) {
    return (
        <div>
            <p className="pb-2">{title}</p>
            <InputField width={width} isError={isError} errorMessage={errorMessage} />
        </div>
    );
}