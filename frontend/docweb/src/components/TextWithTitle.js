import React, { useState } from "react";


export default function TextWithTitle({title, width, isError, errorMessage,content}) {
    return (
        <div>
            <p className="pb-2">{title}</p>
            <p className="font-medium" width={width} isError={isError} errorMessage={errorMessage} >{content}</p>
        </div>
    );
}