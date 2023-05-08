import React, { useState } from "react";
import PageContainer from "../components/PageContainer";
import Calendar from "../components/Calendar";
import AppointmentWide from "../components/AppointmentWide";

export default function DoctorAppointments() {
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

    return (
      <PageContainer title="Upcoming appointments">
      <div className="w-full pt-10 grid grid-cols-2 place-start justify-items-start">
        <div className="justify-self-stretch space-y-8">
          {
            appointments.map( appointment =>
              <AppointmentWide date={appointment.date} hour={appointment.hour} personName={appointment.name + " " + appointment.surname} visitType={appointment.visitType} />
            )
          }
        </div>
        <div className="justify-self-center px-20 py-14 bg-greenLight border border-2 border-greenPrimary space-y-6">
          <p className="text-3xl font-bold text-greenPrimary">Calendar</p>
          <Calendar highlightedDays={highlightedDays} chosenDate={chosenDate} onChosenDate={(value) => setChosenDate(value)} />
        </div>
      </div>
    </PageContainer>
      );
}