import React, { useState, useEffect } from "react";
import SimpleDialog from "./SimpleDialog";
import Button from "../Button";
import InputSchedule from "../InputSchedule";

export default function WorkScheduleDialog({open, onClose, onConfirm, schedule}) {
    const [newSchedule, setNewSchedule] = useState(schedule);

    useEffect(()=>{
        setNewSchedule(schedule)
    },[schedule])

    return (
        <SimpleDialog open={open} handleClose={onClose} title="Edit work schedule">
            <div className="pr-10 pt-4">
            <InputSchedule schedule={newSchedule} setSchedule={(v) => setNewSchedule(v)}/>
            </div>

            <div className="w-full grid justify-items-end pt-6">
                <div className="flex flex-row space-x-4 pt-4">
                <Button label="Close" color="pink outline" onClick={() => onClose()} />
                <Button label="Confirm" onClick={() => {
                    console.log(newSchedule);
                    onConfirm(newSchedule)
                    onClose()
                }} />
                </div>
            </div>
        </SimpleDialog>
    );
};