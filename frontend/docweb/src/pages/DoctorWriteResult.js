import React, { useState, useEffect } from "react";
import GreenBackground from "../resources/green-background.png";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Calendar from "../components/Calendar";
import { useNavigate } from "react-router-dom";
import AppointmentWideResult from "../components/AppointmentWideResult";
import dayjs, { Dayjs } from 'dayjs';

function Appointments({ appointments, onClick }) {
  if (appointments.length <= 0)
    return <p className="text-zinc-500">You have no appointments on this day.</p>;
  else
    return (
      appointments.map(appointment =>
        <Appointment appointment={appointment} onClick={onClick} />
      )
    );
}

function Appointment({ appointment, onClick }) {
  const date = new Date().toISOString().slice(0, 10)
  const dateAppointment = new Date(appointment.date).toISOString().slice(0, 10)
  console.log(date);
  console.log(dateAppointment);
  console.log(date < dateAppointment);

  return <AppointmentWideResult date={appointment.date} hour={appointment.hour} name={appointment.patient.name + " " + appointment.patient.surname} visitType={appointment.visitType.description} onClick={() => onClick(appointment)} />

}

export default function DoctorWriteResult({ }) {

  const [appointments, setAppointments] = useState([]);

  const navigate = useNavigate();

  const onDateChosen = (event) => {
    let date = event.format('YYYY-MM-DD');
    console.log(date);
    setChosenDate(date)
  };

  const [chosenDate, setChosenDate] = useState();
  const [highlightedDays, setHighlightedDays] = React.useState([]);

  const onAddClick = (app) => {
    navigate('/add_result', {
      state: {
        appointment: app
      }
    });
    window.location.reload();
  };

  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if (typeof chosenDate !== "undefined")
      getAppointments();
    setIsShown(true);
  }, [chosenDate])

  useEffect(() => {
    getAppointmentsForMonth();
    setIsShown(true);
  }, [isShown])

  let getAppointments = async () => {
    try {
      let res = await fetch('http://localhost:8080/appointments/doctor/date/' + chosenDate, {
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
        setAppointments(list);
      } else {
        console.log("get appointments failed");
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="w-full flex flex-col items-start ">
        <img className="absolute object-contain" src={GreenBackground} />
        <div className="relative w-full h-screen flex justify-center align-middle items-center">
          <div className="relative px-12 py-12 bg-white flex flex-col justify-center items-start space-y-10">
            <p className="text-3xl font-bold">Write your patient`s health result!</p>
            <p className="text-2xl font-medium">Pick a date</p>

            <div className="w-full grid grid-cols-3 gap-x-20 justify-items-start">
              <div>
                <div className="justify-self-center bg-greenLight border border-2 border-greenPrimary space-y-6">
                  <Calendar highlightedDays={highlightedDays} chosenDate={chosenDate} onChosenDate={onDateChosen} />
                </div>
              </div>
              <div className="col-span-2 justify-self-stretch space-y-8">
                <Appointments appointments={appointments} onClick={onAddClick} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}