import React, { useState, useEffect } from "react";
import YesNoDialog from "./dialogs/YesNoDialog";

export default function AppointmentWideDoctor({ appointment, setIsShown, date, hour, name, visitType, onCancel }) {
    const [isDialogShown, setIsDialogShown] = useState(false);

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
                setIsShown(false);
            } else {
                console.log("deleting appointment failed")
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <YesNoDialog opne={isDialogShown} onClose={() => setIsDialogShown(false)} onConfirm={onCancel} />
            <div className="w-full border border-[3px] border-greenPrimary rounded-xl">
                <div className="w-full h-[50px] border border-[3px] border-greenPrimary bg-greenPrimary rounded-t-md flex flex-row space-x-6 items-center">
                    <p className="pl-6 text-xl text-white font-bold">Appointment</p>
                    <p className="pl-6 text-xl text-white font-normal">date: {date}</p>
                    <p className="pl-6 text-xl text-white font-normal">hour: {hour}</p>
                </div>

                <div className="flex flex-col space-y-2 pt-6 pl-6">
                    <p className="text-lg">{name}</p>
                    <p className="text-lg font-medium ">Visit type: {visitType}</p>
                </div>
                <div className="w-full grid justify-items-end pr-4 pb-2">
                    <p className="underline hover:cursor-pointer hover:text-pink-400" onClick={() => setIsDialogShown(true)}>cancel appointment</p>
                </div>
            </div>
        </div>
    );
};