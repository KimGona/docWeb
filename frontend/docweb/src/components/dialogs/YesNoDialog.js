import React, { useState, useEffect } from "react";
import SimpleDialog from "./SimpleDialog";
import Button from "../Button";

export default function YesNoDialog({ open, onClose, onConfirm }) {
    return (
        <SimpleDialog open={open} handleClose={onClose} title="Cancel appointment">
            <p className="font-normal text-xl py-6">Are you sure you want to cancel this appointment?</p>
            <div className="w-full grid justify-items-end">
                <div className="flex flex-row space-x-4 pt-4">
                    <Button label="No" color="pink outline" onClick={() => onClose()} />
                    <Button label="Yes" onClick={() => {
                        onConfirm()
                        onClose()
                    }} />
                </div>
            </div>
        </SimpleDialog>
    );
};