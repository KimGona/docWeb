import React, { useState } from "react";
import PageContainer from "../components/PageContainer";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Calendar from "../components/Calendar";
import AppointmentWidePatient from "../components/AppointmentWidePatient";
import NavButton from "../components/navigation_components/NavButton";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function Appointments({appointments}) {
  if (appointments.length <= 0)
      return <p className="text-zinc-500">You have no upcoming appointments.</p>;
  else 
      return (
        appointments.map( appointment =>
          <AppointmentWidePatient date={appointment.date} hour={appointment.hour} name={appointment.name + " " + appointment.surname} visitType={appointment.visitType} />
        )
      );
}

export default function PatientDashboard({}) {
  
  const [appointments, setAppointments] = useState([{
    date: "10.04.23",
    hour: "9:00",
    name: "Allen",
    surname: "Walker",
    visitType: "Regular checkup"
  }, 
  {
    date: "10.04.23",
    hour: "9:00",
    name: "Allen",
    surname: "Walker",
    visitType: "Regular checkup"
  }]);
  const [chosenDate, setChosenDate] = useState();
  const [highlightedDays, setHighlightedDays] = React.useState([0, 2, 4, 15, 16, 17]);

  const navigate = useNavigate();
  
  const onAddNewAppointement = () => {
    let app = {
      "doctor": {
        "id": 0,
        "name": "",
        "surname": "",
        "specialty": "",
      },
      "visitType": {
        "id": 0,
        "name": "",
      },
      "date": "",
      "hour": 0,
    }
    navigate('/appointment_doctors', { state: { 
      appointment: app
    } });
    window.location.reload();
  };

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <PageContainer title="Upcoming appointments">
          <div className="w-full pt-10 grid grid-cols-2 place-start justify-items-start">
            <div className="justify-self-stretch space-y-8">
                <div className="grid grid-cols-1 justify-items-start space-y-8">
                <Appointments appointments={appointments} />
                <Button color="pink" label="+ Add new appointment" onClick={onAddNewAppointement}/>
                </div>
            </div>
            <div className="justify-self-center px-20 py-14 bg-greenLight border border-2 border-greenPrimary space-y-6">
              <p className="text-3xl font-bold text-greenPrimary">Calendar</p>
              <Calendar highlightedDays={highlightedDays} chosenDate={chosenDate} onChosenDate={(value) => setChosenDate(value)} />
            </div>
          </div>
        </PageContainer>
      </LocalizationProvider>
    );
}