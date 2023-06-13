import React, { useState, useEffect } from "react";
import SimpleDialog from "./SimpleDialog";
import Button from "../Button";

export default function YesNoDialog({ open, onClose, appointment }) {

    const deleteAppointment = async () => {
        try {
            let requestBody = JSON.stringify(appointment);

            let res = await fetch('http://localhost:8080/appointments/delete', {
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
            console.log("res code: " + res.status.toString());

            if (res.status === 200) {
                console.log("success - deleting appointment")
                console.log(await res.text())
            } else {
                console.log("deleting appointment failed")
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SimpleDialog open={open} handleClose={onClose} title="Cancel appointment">
            <p className="font-normal text-xl py-6">Are you sure you want to cancel this appointment?</p>
            <div className="w-full grid justify-items-end">
                <div className="flex flex-row space-x-4 pt-4">
                    <Button label="No" color="pink outline" onClick={() => onClose()} />
                    <Button label="Yes" onClick={() => {
                        deleteAppointment()
                        onClose()
                    }} />
                </div>
            </div>
        </SimpleDialog>
    );
};