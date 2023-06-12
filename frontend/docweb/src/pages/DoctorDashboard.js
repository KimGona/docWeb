import React, { useState, useEffect } from "react";
import PageContainer from "../components/PageContainer";
import AppointmentWideDoctor from "../components/AppointmentWideDoctor";
import CalendarWithVisits from "../components/CalendarWithVisits";
import dayjs, { Dayjs } from 'dayjs';

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [chosenDate, setChosenDate] = useState();
  const [monthAppointments, setMonthAppointments] = useState([]);
  const [highlightedDays, setHighlightedDays] = React.useState([]);  // first number not rendered, put always first as 0

  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    getAppointments();
    getAppointmentsForMonth();
    setIsShown(true);
  }, [isShown])

  let getAppointments = async () => {
    try {
      let res = await fetch('http://localhost:8080/appointments/doctor/current-date', {
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
        setMonthAppointments(list);
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
        <PageContainer title="Today's appointments">
          <div className="w-full pt-10 grid grid-cols-2 place-start justify-items-start">
            <div className="justify-self-stretch space-y-8">
              {
                appointments.map( appointment =>
                  <AppointmentWideDoctor date={appointment.date} hour={appointment.hour} name={appointment.patient.name + " " + appointment.patient.surname} visitType={appointment.visitType.description} />
                )
              }
            </div>
            <div className="justify-self-center">
            <CalendarWithVisits highlightedDays={highlightedDays} chosenDate={chosenDate} onChosenDate={(value) => setChosenDate(value)} appointments={monthAppointments}/>
            </div>
          </div>
        </PageContainer>
    );
}