import React, { useState, useEffect } from "react";
import PageContainer from "../components/PageContainer";
import AppointmentWidePatient from "../components/AppointmentWidePatient";
import { useNavigate } from "react-router-dom";


function Appointments({appointments, onClick}) {
  if (appointments.length <= 0)
      return <p className="text-zinc-500">You have no upcoming appointments.</p>;
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
  if (date < dateAppointment) {
    return <AppointmentWidePatient date={appointment.date} hour={appointment.hour} name={appointment.doctor.name + " " + appointment.doctor.surname} visitType={appointment.visitType.description} onClick={() => onClick(appointment)}/>
  } else {
    return <AppointmentWidePatient date={appointment.date} hour={appointment.hour} name={appointment.doctor.name + " " + appointment.doctor.surname} visitType={appointment.visitType.description} isDark={true} onClick={() => onClick(appointment)}/>
  }
}

export default function PatientAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [chosenDate, setChosenDate] = useState();
    const [highlightedDays, setHighlightedDays] = React.useState([0, 2, 4, 15, 16, 17]);

const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    showAppointments();
    setIsShown(true);
  }, [isShown])

  let showAppointments = async () => {
    try {
      let res = await fetch('http://localhost:8080/appointments/patient/date-from', {
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


    const navigate = useNavigate();

    const onEditClick = (app) => {
      navigate('/edit_appointment', { state: {
        appointment: app
      } });
      window.location.reload();
    };

    return (
        <PageContainer title="All appointments">
          <div className="w-full pt-10 grid grid-cols-2 place-start justify-items-start">
            <div className="justify-self-stretch space-y-8">
                <div className="grid grid-cols-1 justify-items-start space-y-8">
                <Appointments appointments={appointments} onClick={onEditClick}/>
                </div>
            </div>
            </div>
        </PageContainer>
      );
}