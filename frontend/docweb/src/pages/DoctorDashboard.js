import React, { useState } from "react";
import PageContainer from "../components/PageContainer";
import AppointmentWideDoctor from "../components/AppointmentWideDoctor";
import CalendarWithVisits from "../components/CalendarWithVisits";

export default function DoctorDashboard() {
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
  const [highlightedDays, setHighlightedDays] = React.useState([0, 2, 4, 15, 16, 17]);  // first number not rendered, put always first as 0

    return (
        <PageContainer title="Today's appointments">
          <div className="w-full pt-10 grid grid-cols-2 place-start justify-items-start">
            <div className="justify-self-stretch space-y-8">
              {
                appointments.map( appointment =>
                  <AppointmentWideDoctor date={appointment.date} hour={appointment.hour} name={appointment.name + " " + appointment.surname} visitType={appointment.visitType} />
                )
              }
            </div>
            <div className="justify-self-center">
            <CalendarWithVisits highlightedDays={highlightedDays} chosenDate={chosenDate} onChosenDate={(value) => setChosenDate(value)} />
            </div>
          </div>
        </PageContainer>
    );
}