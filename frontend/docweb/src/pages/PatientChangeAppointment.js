import React, { useState } from "react";
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import SummaryItem from "../components/SummaryItem";
import Calendar from "../components/Calendar";
import AvailableHours from "../components/AvailableHours";

function getTimeDesc(hour) {
    if (hour < 12) return "am";
    else return "pm"
}

export default function PatientChangeAppointment() {
    const {state} = useLocation();
    const { appointment } = state;

    const navigate = useNavigate();

    const getInitialHour = () => {
        if (appointment.hour !== 0)
          return appointment.hour;
        else return hours[0];
    };

    const onDateChosen = (event) => {
        let date = event.$y + "-" + event.$M + "-" + event.$D
        console.log(date);
        setChosenDate(date)
    };

    const [hours, setHours] = useState([9,10,12,13]);
    const [selectedHour, setSelectedHour] = useState(getInitialHour());
    
    const [chosenDate, setChosenDate] = useState();
    const [highlightedDays, setHighlightedDays] = React.useState([0, 2, 4, 15, 16, 17]);


    const onHourChosen = (event) => {
        console.log(event)
        setSelectedHour(event)
    }

    const onConfirmChange = () => {
        let app = {...appointment}
        app.date = chosenDate
        app.hour = selectedHour
        navigate('/');
        window.location.reload();
    };

    const onReturn = () => {
        navigate(-1);
    };

    return (
        <PageContainer title="Add appointment">
          <div className="pr-[700px] w-full flex flex-col gap-x-10 justify-items-start">
            <SummaryItem 
                topText="Your specialist" 
                middleText={"Dr " + appointment.doctor.name + " " + appointment.doctor.surname} 
                bottomText={appointment.doctor.specialty}
                isButtonVisible={false}
            />
            <SummaryItem 
                topText="Type of visit" 
                middleText={appointment.visitType.name}
                isButtonVisible={false}
            />
            <div className="pt-10 w-full grid grid-cols-2 gap-x-10 justify-items-start">
                <div>
                    <p className="text-2xl font-medium pb-10">Pick a date</p>
                    <div className="justify-self-center bg-greenLight border border-2 border-greenPrimary space-y-6">
                        <Calendar highlightedDays={highlightedDays} chosenDate={chosenDate} onChosenDate={onDateChosen} />
                    </div>
                </div>
                <div>
                    <p className="text-2xl font-medium pb-10">Available hours</p>
                    <AvailableHours hours={hours} selectedHour={selectedHour} setSelectedHour={onHourChosen}/>
                </div>
            </div>
            <div className="py-6 flex flex-row gap-x-6 align-center items-center">
                <Button color="pink big" label="Confirm" onClick={onConfirmChange} />
                <Button color="pink outline big" label="Cancel" onClick={onReturn} />
            </div>
          </div>
        </PageContainer>
      );
}