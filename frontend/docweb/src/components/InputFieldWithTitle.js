import React, { useState } from "react";
import InputField from "../components/InputField";

export default function InputFieldWithTitle({title, width}) {
    return (
        <div>
            <p className="pb-2">{title}</p>
            <InputField width={width} />
        </div>
    );
}