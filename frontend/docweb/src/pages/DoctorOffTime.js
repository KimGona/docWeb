import React, { useState } from "react";
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Calendar from "../components/Calendar";

function isChecked(elem, chosen) {
    if (chosen.includes(elem)) return true;
    else return false;
}

function isDisabled(elem, free) {
    if (!free.includes(elem)) return true;
    else return false;
}

export default function DoctorOffTime() {
    const [monthSchedule, setMonthSchedule] = useState(["2023-05-23", "2023-05-24"]);

    const [schedule, setSchedule] = useState([9,10,13,14,15]);
    const [freeTimes, setFreeTimes] = useState([9,14,15]);
    const [chosenArr, setChosenArr] = useState([0]);

    const [chosenDate, setChosenDate] = useState();
    const [highlightedDays, setHighlightedDays] = React.useState([0, 2, 4, 15, 16, 17]);

    const onConfirmClick = () => {
        // TODO: send data and get free times again
    };

    return (
        <PageContainer title="My schedule">
          <div className="pt-10 w-full grid grid-cols-2 gap-x-60 justify-items-start">
            <div className="flex flex-col gap-4">
                <p className="text-xl font-normal pb-10">Choose a day</p>
                <div className="justify-self-center px-20 py-14 bg-greenLight border border-2 border-greenPrimary space-y-6">
                    <p className="text-3xl font-bold text-greenPrimary">Calendar</p>
                    <Calendar highlightedDays={highlightedDays} chosenDate={chosenDate} onChosenDate={(value) => setChosenDate(value)} />
                </div>
                <div className="pt-10">
                    <Button color="pink big" label="Confirm off time" onClick={onConfirmClick}/>
                </div>
            </div>

            <div className="justify-self-start">
                <p className="text-xl font-normal pb-10">Schedule for {chosenDate}</p>
                <p className="text-lg font-medium pb-6">Select hours to check off</p>
                <FormGroup>
                {
                    schedule.map( hour =>
                        <FormControlLabel
                            key={hour}
                            control={<Checkbox value={hour} onClick={ (event) =>
                                {
                                    const newElem = parseInt(event.target.value, 10)
                                    let newArr = [...chosenArr];
                                    if (newArr.includes(newElem)) {
                                        const index = chosenArr.indexOf(newElem);
                                        newArr.splice(index, 1);
                                    } else {
                                        newArr.push(newElem);
                                    }
                                    setChosenArr(newArr);
                                }
                            } name={hour.toString()} checked={isChecked(hour, chosenArr)}
                                disabled={isDisabled(hour, freeTimes)}
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