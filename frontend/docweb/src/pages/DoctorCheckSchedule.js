import React, { useState, useEffect } from "react";
import PageContainer from "../components/PageContainer";
import dayjs, { Dayjs } from 'dayjs';
import ColoredText from "../components/ColoredText";
import RoundedTextBox from "../components/RoundedTextBox";
import Spacer from "../components/Spacer";
import ButtonNew from "../components/ButtonNew";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function isChecked(elem, chosen) {
    if (chosen.includes(elem)) return true;
    else return false;
}

function isDisabled(elem, free) {
    if (!free.includes(elem)) return true;
    else return false;
}

export default function DoctorCheckSchedule() {
    const [schedule, setSchedule] = useState([9, 10, 13, 14, 15]);
    const [chosenArr, setChosenArr] = useState([]);

    const [chosenDate, setChosenDate] = useState();
    const [highlightedDays, setHighlightedDays] = React.useState([]);

    const [isShown, setIsShown] = useState(false);

    const onDateChosen = (event) => {
        let date = event.format('YYYY-MM-DD');
        console.log(date);
        setChosenDate(date)
    };

    const [isShownMonth, setIsShownMonth] = useState(false);

    useEffect(() => {
        getAppointmentsForMonth();
        setIsShownMonth(true);
    }, [isShownMonth])

    useEffect(() => {
        if (typeof chosenArr !== "undefined")
            getTimes();
        setIsShown(true);
    }, [isShown, chosenDate])

    let getTimes = async () => {
        try {
            let res = await fetch('http://localhost:8080/schedule-times/current-doctor/date/' + chosenDate, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                mode: 'cors',
                referrerPolicy: 'no-referrer',
                origin: "http://localhost:3000/",
            });

            if (res.status === 200) {
                console.log("get times succeeded");
                let list = await res.json();
                console.log(list);
                setSchedule(list);
            } else {
                console.log("get times failed");
            }
        } catch (error) {
            console.log(error);
        }
    }

    function getTimeMapped(time) {
        let obj = {
            hour: time
        }
        return obj;
    }

    const setOffTime = async (event) => {
        event.preventDefault();
        try {
            let data = {
                date: chosenDate,
                timeList: chosenArr.map(t => getTimeMapped(t)),
            }
            console.log("data");
            console.log(data);
            let requestBody = JSON.stringify([data]);

            let res = await fetch('http://localhost:8080/free-times', {
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
                console.log("success - addidng free time")
                console.log(await res.text())
                setIsShown(false);
            } else {
                console.log("adding free time failed")
            }
        } catch (error) {
            console.log(error);
        }
    }

    let getAppointmentsForMonth = async () => {
        try {
          let res = await fetch('http://localhost:8080/appointments/doctor/current-month', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors',
            referrerPolicy: 'no-referrer',
            origin: "http://localhost:3000/",
          });
    
          if (res.status === 200) {
            console.log("get appointments succeeded");
            let list = await res.json();
            console.log(list);
            let days = list.map(d => dayjs(d.date).date());
            console.log("days");
            console.log(days);
            setHighlightedDays([0].concat(days));
          } else {
            console.log("get appointments failed");
          }
        } catch (error) {
          console.log(error);
        }
      }

    const schedulee = [
    { name: "Monday", date: "Dec 4, 2024", startHour: 9, endHour: 12, freeHours: [10, 11]},
    { name: "Tuesday", date: "Dec 5, 2024", startHour: 9, endHour: 12, freeHours: [10, 11] },
    { name: "Wednesday", date: "Dec 6, 2024", startHour: 9, endHour: 12, freeHours: [10, 11] },
    { name: "Thursday", date: "Dec 7, 2024", startHour: 9, endHour: 12, freeHours: [] },
    { name: "Friday", date: "Dec 8, 2024", startHour: 9, endHour: 12, freeHours: [10, 11]},
    { name: "Saturday", date: "Dec 9, 2024", startHour: 9, endHour: 12, freeHours: [] },
    { name: "Sunday", date: "Dec 10, 2024", startHour: 9, endHour: 12, freeHours: [10, 11] },
    ];

    const [weekOffset, setWeekOffset] = useState(0);

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
            
            <div className="pt-10 w-full">
            <p className="text-lg font-bold">Your schedule</p>
            <Spacer />
            <div className="flex justify-between items-center mb-4">
                {weekOffset > 0 ? (
                <button
                onClick={handlePrevWeek}
                className="text-gray-800 bg-white px-4 py-2 rounded-full shadow-md hover:bg-gray-200"
                >
                ← Previous
                </button>
                ) : (<div></div>)}
                <button
                onClick={handleNextWeek}
                className="text-gray-800 bg-white px-4 py-2 rounded-full shadow-md hover:bg-gray-200"
                >
                Next →
                </button>
            </div>
            </div>

            <div className="pt-10 w-full grid grid-cols-2 gap-x-60 justify-items-start">
                <div className="flex flex-row gap-4">

                    {schedulee.map((day, index) => (
                    <div className="flex flex-col gap-4">
                        <p className="text-sm font-bold">{day.name}</p>
                        <p className="text-sm font-normal">{day.date}</p>
                        <Spacer />
                        <ColoredText text="Schedule" bgColor="bg-blue-500" />
                        <p className="text-sm font-normal">{`${day.startHour}:00 - ${day.endHour}:00`}</p>
                        <div className=""></div>
                        <Spacer />
                        <ColoredText text="Free time" bgColor="bg-violet-600" />
                        {day.freeHours ? day.freeHours.map((free, indexFree) => (
                            <RoundedTextBox text={`${free}:00`} />
                        )) : <div></div>}
                    </div>
                    ))}
                </div>
            </div>
            
            <Spacer />
            <Spacer />
            
            <p className="text-lg font-bold">Manage schedule</p>
            <Spacer />
            <Button label="Select time off" onClick={openSelectTimeOff} />
        </PageContainer>
    );
}