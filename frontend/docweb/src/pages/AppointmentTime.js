import React, { useState } from "react";
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import RadioButtonVisitTypeList from "../components/RadioButtonVisitTypeList";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import AvailableHours from "../components/AvailableHours";
import Calendar from "../components/Calendar";

const getCurrentDate = () => {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${year}-${month}-${day}`;
  console.log(currentDate); 
  return currentDate;
};

export default function AppointmentTime() {
  const {state} = useLocation();
  const { appointment } = state;

  const getInitialHour = () => {
    if (appointment.hour !== 0)
      return appointment.hour;
    else return hours[0];
  };

  const [hours, setHours] = useState([9,10,12,13]);
  const [selectedHour, setSelectedHour] = useState(getInitialHour());
  
  const [chosenDate, setChosenDate] = useState();
  const [highlightedDays, setHighlightedDays] = React.useState([0, 2, 4, 15, 16, 17]);


  const onHourChosen = (event) => {
    console.log(event)
    setSelectedHour(event)
  }

  const navigate = useNavigate();
  
  const onNextClick = () => {
    let app = {...appointment}
    app.date = chosenDate
    app.hour = selectedHour
    navigate('/appointment_summary', { state: { 
      appointment: app
    } });
  };

  const onReturnClick = () => {
    navigate(-1);
  };

  const onDateChosen = (event) => {
    let date = event.$y + "-" + event.$M + "-" + event.$D
    console.log(date);
    setChosenDate(date)
  };

    return (
        <PageContainer title="Add appointment">
          {/* Summary bar */}
          <div className="fixed right-0 top-0 h-full w-[300px] bg-zinc-300 p-10">
            <div className="relative py-10 px-2 flex flex-col gap-y-10">
              <p className="text-zinc-700 font-semibold text-3xl">Summary</p>
              <div>
                <p className="text-zinc-700 text-thin text-xl">Chosen doctor</p>
                <p className="text-black text-medium text-2xl">{appointment.doctor.name}</p>
              </div>
              
              <div>
                <p className="text-zinc-700 text-thin text-xl">Visit type</p>
                <p className="text-black text-medium text-2xl">{appointment.visitType.name}</p>
              </div>
              
              <div>
                <p className="text-zinc-700 text-thin text-xl">Date</p>
                <p className="text-black text-medium text-2xl">{chosenDate}</p>
              </div>

              <div>
                <p className="text-zinc-700 text-thin text-xl">Hour</p>
                <p className="text-black text-medium text-2xl">{selectedHour}</p>
              </div>
            </div>

            <div className="fixed right-20 bottom-10">
              <div className="relative">
                <div className="flex flex-col items-center gap-y-4">
                <Button color="green outline big" label="Return" onClick={onReturnClick}/>
                <Button color="pink big" label="Next" onClick={onNextClick}/>
                </div>
                <a className="pt-6 underline text-sm text-medium" href="/">Cancel</a>
              </div>
            </div>
        
          {/* Screen content */}
          </div>
          <div className="pr-80 pt-10 w-full grid grid-cols-2 gap-x-10 justify-items-start">
            <div>
                <p className="text-2xl font-medium pb-10">Pick a date</p>
                <div className="justify-self-center px-20 py-14 bg-greenLight border border-2 border-greenPrimary space-y-6">
                    <p className="text-3xl font-bold text-greenPrimary">Calendar</p>
                    <Calendar highlightedDays={highlightedDays} chosenDate={chosenDate} onChosenDate={onDateChosen} />
                </div>
            </div>
            <div>
                <p className="text-2xl font-medium pb-10">Available hours</p>
                <AvailableHours hours={hours} selectedHour={selectedHour} setSelectedHour={onHourChosen}/>
            </div>
          </div>
        </PageContainer>
      );
}