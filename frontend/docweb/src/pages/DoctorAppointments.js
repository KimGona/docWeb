import React, { useState, useEffect } from "react";
import PageContainer from "../components/PageContainer";
import Calendar from "../components/Calendar";
import AppointmentWideDoctor from "../components/AppointmentWideDoctor";
import dayjs, { Dayjs } from 'dayjs';

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [chosenDate, setChosenDate] = useState();
  const [highlightedDays, setHighlightedDays] = React.useState([]);

  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    getAppointments();
    getAppointmentsForMonth();
    setIsShown(true);
  }, [isShown])

  let getAppointments = async () => {
    try {
      let res = await fetch('http://localhost:8080/appointments/doctor/date-from', {
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
      <PageContainer title="Upcoming appointments">
      <div className="w-full pt-10 grid grid-cols-2 place-start justify-items-start">
        <div className="justify-self-stretch space-y-8">
          {
            appointments.map( appointment =>
              <AppointmentWideDoctor appointment={appointment} date={appointment.date} hour={appointment.hour} name={appointment.patient.name + " " + appointment.patient.surname} visitType={appointment.visitType.description} />
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