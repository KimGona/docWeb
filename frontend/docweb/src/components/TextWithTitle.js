import React, { useState } from "react";


export default function TextWithTitle({title, width, isError, errorMessage,content}) {
    return (
        <div>
            <p className="text-xl pb-2">{title}</p>
            <p className="text-xl font-medium" width={width} isError={isError} errorMessage={errorMessage} >{content}</p>
        </div>
    );
}