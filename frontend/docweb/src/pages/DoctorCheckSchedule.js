import React, { useState, useEffect } from "react";
import PageContainer from "../components/PageContainer";
import dayjs, { Dayjs } from 'dayjs';
import ColoredText from "../components/ColoredText";
import RoundedTextBox from "../components/RoundedTextBox";
import Spacer from "../components/Spacer";
import ButtonNew from "../components/ButtonNew";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import ScheduleTimeRepository from "../repository/ScheduleTimeRepository";

function isChecked(elem, chosen) {
    if (chosen.includes(elem)) return true;
    else return false;
}

function isDisabled(elem, free) {
    if (!free.includes(elem)) return true;
    else return false;
}

export default function DoctorCheckSchedule() {
    const [schedule, setSchedule] = useState([]);
    const [weekOffset, setWeekOffset] = useState(0);

    useEffect(() => {
        getTimes();
    }, [weekOffset])
    
    const getTimes = async () => {
        let result = await ScheduleTimeRepository.getAvailableTimesForCurrentDoctor(weekOffset);
        let list = result.map(day => ({
            name: day.name,
            date: day.date,
            schedule: day.schedule,
            takenHours: day.hours.filter(hour => hour.taken).map(h => h.value),
            freeHours: day.hours.filter(hour => hour.free).map(h => h.value)
        }));
        setSchedule(list);
    }

    const schedulee = [
    { name: "Monday", date: "Dec 4, 2024", schedule: "9:00 - 12:00", takenHours: [], freeHours: [10, 11]},
    { name: "Tuesday", date: "Dec 5, 2024", schedule: "9:00 - 12:00", freeHours: [10, 11] },
    { name: "Wednesday", date: "Dec 6, 2024", schedule: "9:00 - 12:00", freeHours: [10, 11] },
    { name: "Thursday", date: "Dec 7, 2024", schedule: "9:00 - 12:00", freeHours: [] },
    { name: "Friday", date: "Dec 8, 2024", schedule: "9:00 - 12:00", freeHours: [10, 11]},
    { name: "Saturday", date: "Dec 9, 2024", schedule: "9:00 - 12:00", freeHours: [] },
    { name: "Sunday", date: "Dec 10, 2024", schedule: "9:00 - 12:00", freeHours: [10, 11] },
    ];

    const handlePrevWeek = () => {
        setWeekOffset(weekOffset-1)
    };

    const handleNextWeek = () => {
        setWeekOffset(weekOffset+1)
    };

    const navigate = useNavigate();

    const openSelectTimeOff = () => {
        navigate('/check_off_time_alternative');
    };

    return (
        <PageContainer title="My schedule">
            
            <div className="pt-10">
            <p className="text-lg font-bold">Your schedule</p>
            <Spacer />
            <div className="flex flex-row justify-between items-center gap-10 mb-4">
                {weekOffset > 0 ? (
                <button
                onClick={handlePrevWeek}
                className="text-gray-800 bg-cyan-200 px-4 py-2 rounded-full shadow-md hover:bg-gray-200"
                >
                ← Previous
                </button>
                ) : (<div></div>)}
                <button
                onClick={handleNextWeek}
                className="text-gray-800 bg-cyan-200  px-4 py-2 rounded-full shadow-md hover:bg-gray-200"
                >
                Next →
                </button>
            </div>
            </div>

            <div className="pt-4 w-full grid grid-cols-2 gap-x-60 justify-items-start">
                <div className="flex flex-row gap-4">

                    {schedule.map((day, index) => (
                    <div className="flex flex-col gap-4 sm:p-4 bg-gray-50 even:bg-gray-100">
                        <p className="text-sm font-bold">{day.name}</p>
                        <p className="text-sm font-normal">{day.date}</p>
                        <Spacer />
                        <ColoredText text="Schedule" bgColor="bg-blue-500" />
                        <p className="text-sm font-normal">{day.schedule ? day.schedule : "No schedule"}</p>
                        <div className=""></div>
                        <Spacer />
                        <div>
                        { day.freeHours && day.freeHours.length > 0 ? 
                            <div>
                            <Spacer />
                            <ColoredText text="Free time" bgColor="bg-violet-600" />
                            {day.freeHours.map((free, indexFree) => (
                                <div>
                                <Spacer />
                                <RoundedTextBox text={`${free}:00`} />
                                </div>
                            ))}
                            </div>
                        : <div></div>}
                        </div>
                        
                        <div>
                        { day.takenHours && day.takenHours.length > 0 ? 
                            <div>
                            <Spacer />
                            <ColoredText text="Taken time" bgColor="bg-orange-600" />
                            {day.takenHours.map((taken, indexFree) => (
                                <div>
                                <Spacer />
                                <RoundedTextBox text={`${taken}:00`} />
                                </div>
                            ))}
                            </div>
                        : <div></div>}
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            
            <Spacer />
            <Spacer />
            
            <p className="text-lg font-bold pt-10">Manage schedule</p>
            <Spacer />
            <Button label="Select time off" onClick={openSelectTimeOff} />
        </PageContainer>
    );
}