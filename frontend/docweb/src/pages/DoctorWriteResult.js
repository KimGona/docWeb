import React, { useState } from "react";
import GreenBackground from "../resources/green-background.png";
import Button from "../components/Button";
import InputFieldWithTitle from "../components/InputFieldWithTitle";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';

import InputSchedule from "../components/InputSchedule";
import VisitTypesGrid from "../components/VisitTypesGrid";

import Calendar from "../components/Calendar";
import PageContainer from "../components/PageContainer";
import { useNavigate } from "react-router-dom";
import AppointmentWideResult from "../components/AppointmentWideResult";

function Appointments({appointments, onClick}) {
  if (appointments.length <= 0)
      return <p className="text-zinc-500">You have no appointments on this day.</p>;
  else
      return (
        appointments.map( appointment =>
            <Appointment appointment={appointment} onClick={onClick} />
        )
      );
}

function Appointment({appointment, onClick}) {
  const date = new Date().toISOString().slice(0, 10)
  const dateAppointment = new Date(appointment.date).toISOString().slice(0, 10)
  console.log(date);
  console.log(dateAppointment);
  console.log(date < dateAppointment);

  return <AppointmentWideResult date={appointment.date} hour={appointment.hour} name={appointment.name.name} visitType={appointment.visitType.name} onClick={() => onClick(appointment)}/>

}

export default function DoctorWriteResult({}) {

const [appointments, setAppointments] = useState([{
      "name": {
        "id": 1,
        "name": "Allen",
      },
      "visitType": {
        "id": 1,
        "name": "RegularCheckup",
      },
      "date": "2023-05-26",
      "hour": 9,
    },
    {
      "name": {
        "id": 1,
        "name": "Walker",
      },
      "visitType": {
        "id": 1,
        "name": "RegularCheckup",
      },
      "date": "2023-05-10",
      "hour": 9,
    }]);

     const navigate = useNavigate();

     const onDateChosen = (event) => {
            let date = event.$y + "-" + event.$M + "-" + event.$D
            console.log(date);
            setChosenDate(date)
        };

     const [chosenDate, setChosenDate] = useState();
     const [highlightedDays, setHighlightedDays] = React.useState([0, 2, 4, 15, 16, 17]);

    const onAddClick = (app) => {
          navigate('/add_result', { state: {
            appointment: app
          } });
          window.location.reload();
        };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="w-full flex flex-col items-start ">
            <img className="absolute object-contain" src={GreenBackground} />
             <div className="relative w-full h-screen flex justify-center align-middle items-center">
              <div className="relative px-12 py-12 bg-white flex flex-col justify-center items-start space-y-10">
            <p className="text-3xl font-bold">Write your patient`s health result!</p>

               <div className="pt-10 w-full grid grid-cols-2 gap-x-10 justify-items-start">
                               <div>
                                   <p className="text-2xl font-medium pb-10">Pick a date</p>
                                   <div className="justify-self-center bg-greenLight border border-2 border-greenPrimary space-y-6">
                                       <Calendar highlightedDays={highlightedDays} chosenDate={chosenDate} onChosenDate={onDateChosen} />
                                   </div>
                               </div>
                               <div className="justify-self-stretch space-y-8">

                                   <Appointments appointments={appointments} onClick={onAddClick}/>
                               </div>
                           </div>


            </div>
        </div>
        </div>
        </LocalizationProvider>
    );
}