import React, { useState } from "react";
import PageContainer from "../components/PageContainer";
import Calendar from "../components/Calendar";
import AppointmentWidePatient from "../components/AppointmentWidePatient";
import NavButton from "../components/navigation_components/NavButton";


function Appointments({appointments}) {
  if (appointments.length <= 0)
      return <p className="text-zinc-500">You have no upcoming appointments.</p>;
  else 
      return (
        appointments.map( appointment =>
            <Appointment appointment={appointment} />
        )
      );
}

function Appointment({appointment}) {
  const date = new Date().toISOString().slice(0, 10)
  const dateAppointment = new Date(appointment.date).toISOString().slice(0, 10)
  console.log(date);
  console.log(dateAppointment);
  console.log(date < dateAppointment);
  if (date < dateAppointment) {
    return <AppointmentWidePatient date={appointment.date} hour={appointment.hour} name={appointment.name + " " + appointment.surname} visitType={appointment.visitType} />
  } else {
    return <AppointmentWidePatient date={appointment.date} hour={appointment.hour} name={appointment.name + " " + appointment.surname} visitType={appointment.visitType} isDark={true} />
  }
}

export default function PatientAppointments() {
    const [appointments, setAppointments] = useState([{
      date: "2023-10-04",
      hour: "9:00",
      name: "Allen",
      surname: "Walker",
      visitType: "Regular checkup"
    }, 
    {
      date: "2023-05-12",
      hour: "9:00",
      name: "Allen",
      surname: "Walker",
      visitType: "Regular checkup"
    }]);
    const [chosenDate, setChosenDate] = useState();
    const [highlightedDays, setHighlightedDays] = React.useState([0, 2, 4, 15, 16, 17]);

    return (
        <PageContainer title="All appointments">
          <div className="w-full pt-10 grid grid-cols-2 place-start justify-items-start">
            <div className="justify-self-stretch space-y-8">
                <div className="grid grid-cols-1 justify-items-start space-y-8">
                <Appointments appointments={appointments} />
                </div>
            </div>
            </div>
        </PageContainer>
      );
}