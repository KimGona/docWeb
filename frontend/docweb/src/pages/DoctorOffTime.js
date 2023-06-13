import React, { useState, useEffect } from "react";
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Calendar from "../components/Calendar";
import dayjs, { Dayjs } from 'dayjs';

function isChecked(elem, chosen) {
    if (chosen.includes(elem)) return true;
    else return false;
}

function isDisabled(elem, free) {
    if (!free.includes(elem)) return true;
    else return false;
}

export default function DoctorOffTime() {
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

    return (
        <PageContainer title="My schedule">
            <div className="pt-10 w-full grid grid-cols-2 gap-x-60 justify-items-start">
                <div className="flex flex-col gap-4">
                    <p className="text-xl font-normal pb-10">Choose a day</p>
                    <div className="justify-self-center px-20 py-14 bg-greenLight border border-2 border-greenPrimary space-y-6">
                        <p className="text-3xl font-bold text-greenPrimary">Calendar</p>
                        <Calendar highlightedDays={highlightedDays} chosenDate={chosenDate} onChosenDate={(value) => onDateChosen(value)} />
                    </div>
                    <div className="pt-10">
                        <Button color="pink big" label="Confirm off time" onClick={setOffTime} />
                    </div>
                </div>

                <div className="justify-self-start">
                    <p className="text-xl font-normal pb-10">Schedule for {chosenDate}</p>
                    <p className="text-lg font-medium pb-6">Select hours to check off</p>
                    <FormGroup>
                        {
                            schedule.map(hour =>
                                <FormControlLabel
                                    key={hour}
                                    control={<Checkbox value={hour} onClick={(event) => {
                                        const newElem = parseInt(event.target.value, 10)
                                        let newArr = [...chosenArr];
                                        if (newArr.includes(newElem)) {
                                            const index = chosenArr.indexOf(newElem);
                                            newArr.splice(index, 1);
                                        } else {
                                            newArr.push(newElem);
                                        }
                                        setChosenArr(newArr);
                                    }}
                                        name={hour.toString()}
                                        checked={isChecked(hour, chosenArr)}
                                    // disabled={isDisabled(hour, freeTimes)}
                                    />}
                                    label={hour}
                                />
                            )
                        }
                    </FormGroup>
                </div>
            </div>
        </PageContainer>
    );
}