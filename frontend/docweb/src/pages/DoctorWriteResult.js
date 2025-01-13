import React, { useState, useEffect } from "react";
import GreenBackground from "../resources/green-background.png";
import { useNavigate } from "react-router-dom";
import AppointmentWideResult from "../components/AppointmentWideResult";
import AppointmentRepository from "../repository/AppointmentRepository";
import DateSelector from "../components/DateSelector";
import { getTodaysMonth, getTodaysYear } from "../helper/helper";
import Spacer from "../components/Spacer";

function Appointments({ appointments, onClick }) {
  if (appointments.length <= 0)
    return <p className="text-zinc-500">You have no appointments on this day.</p>;
  else
    return (
      appointments.map(appointment =>
        <AppointmentNew appointment={appointment} onClick={onClick} />
        // <Appointment appointment={appointment} onClick={onClick} />
      )
    );
}

function Appointment({ appointment, onClick }) {
  return <AppointmentWideResult date={appointment.date} hour={appointment.hour} name={appointment.patient.name + " " + appointment.patient.surname} visitType={appointment.visitType.description} onClick={() => onClick(appointment)} />
}

function AppointmentNew({ appointment, onClick }) {
  return (
    <div className="relative flex flex-col gap-2" onClick={() => onClick(appointment)}>
      <p className="text-lg font-bold">{`${appointment.patient.name} ${appointment.patient.surname}`}</p>
      <p className="text-lg">{`Appointment was on ${appointment.date} at ${appointment.hour}:00`}</p>
      <div className="flex items-end justify-between">
          <p className="text-md">{`Visit type: ${appointment.visitType.description}`}</p>
          <button className="bg-violet-500 whitespace-nowrap text-white font-semibold py-2 px-4 rounded hover:bg-violet-600">
              Add health result
          </button>
      </div>
      <hr className="w-full border-t border-gray-300 my-4" />
    </div>

  );
}

export default function DoctorWriteResult({ }) {

  const [appointments, setAppointments] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(getTodaysMonth());
  const [selectedYear, setSelectedYear] = useState(getTodaysYear());

  const navigate = useNavigate();

  const onAddClick = (app) => {
    navigate('/add_result', {
      state: {
        appointment: app
      }
    });
    window.location.reload();
  };

  useEffect(() => {
    getAppointments();
  }, [selectedMonth, selectedYear])

  let getAppointments = async () => {
    let list = await AppointmentRepository.getAppointments(selectedMonth, selectedYear);
    setAppointments(list);
  }

  const handleDateChange = (month, year) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  return (
      <div className="w-full flex flex-col items-start ">
        <img className="absolute object-contain" src={GreenBackground} />
        <div className="relative w-full h-screen flex justify-center align-middle items-center px-20">
          <div className="relative px-12 py-12 w-full bg-white flex flex-col justify-center items-start space-y-6">
            <p className="text-3xl font-bold">Write your patient`s health result!</p>
            <p className="text-md font-normal text-gray-500 pb-2">View appointments for the given month and select to which you want add health results.</p>
            <div>
            <p className="text-2xl font-medium">Pick a date</p>
            <p className="text-md font-normal text-gray-500">Select the month and year to view the appointments which took place in that time.</p>
            </div>
            
            <DateSelector onDateChange={handleDateChange} />

            <div className="relative w-full grid grid-cols-3 gap-x-20 justify-items-start">
              <div className="relative col-span-2 justify-self-stretch space-y-8">
                <Appointments appointments={appointments} onClick={onAddClick} />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}