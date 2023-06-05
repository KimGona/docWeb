import React, { useState, useEffect } from "react";
import SimpleDialog from "./SimpleDialog";
import Button from "../Button";
import InputSchedule from "../InputSchedule";

export default function WorkScheduleDialog({open, onClose, setIsShown, schedule, userId}) {
    const [newSchedule, setNewSchedule] = useState(schedule);

    useEffect(()=>{
        setNewSchedule(schedule)
    },[schedule])

    function getTimeList(start, end) {
        let list = [];
        let startTime = parseInt(start, 10);
        let endTime = parseInt(end, 10);
        for (let step = startTime; step <= endTime; step++) {
            list.push({
                hour: step,
            });
        }
        return list;
    }

    function getScheduleObj(s) {
        return {
            day: s.day,
            dayName: s.dayName,
            timeList: getTimeList(s.start, s.end),
            doctor: {
                id: parseInt(userId, 10),
                name: "",
                surname: "",
                speciality: "",
                phone: "",
                gender: "",
                visitTypes: [],
            }
        }
    }

    function getScheduleTimeMapped(schedule) {
        return schedule.map(s =>
            getScheduleObj(s)
        );
    }

    const setScheduleTimesReq = async (event) => {
        event.preventDefault();
        try {
            let requestBody = JSON.stringify(getScheduleTimeMapped(schedule));

            let res = await fetch('http://localhost:8080/schedule-times', {
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
                console.log("success - addidng time schedule")
                console.log(await res.text())
                setIsShown(false);
            } else {
                console.log("adding time schedule failed")
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SimpleDialog open={open} handleClose={onClose} title="Edit work schedule">
            <div className="pr-10 pt-4">
            <InputSchedule schedule={newSchedule} setSchedule={(v) => setNewSchedule(v)}/>
            </div>

            <div className="w-full grid justify-items-end pt-6">
                <div className="flex flex-row space-x-4 pt-4">
                <Button label="Close" color="pink outline" onClick={() => onClose()} />
                <Button label="Confirm" onClick={(e) => {
                    console.log(newSchedule);
                    setScheduleTimesReq(e)
                    onClose()
                }} />
                </div>
            </div>
        </SimpleDialog>
    );
};