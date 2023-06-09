import React, { useState, useEffect } from "react";
import YesNoDialog from "./dialogs/YesNoDialog";

export default function AppointmentWideDoctor({ appointment, date, hour, name, visitType }) {
    const [isDialogShown, setIsDialogShown] = useState(false);

    return (
        <div>
            <YesNoDialog appointment={appointment} open={isDialogShown} onClose={() => setIsDialogShown(false)} />
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