import React, { useState, useEffect } from "react";
import PageContainer from "../components/PageContainer";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Calendar from "../components/Calendar";
import AppointmentWidePatient from "../components/AppointmentWidePatient";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import LineChart from "../components/LineChart";
import LineChartBloodSugar from "../components/LineChartBloodSugar";
import LineChartBloodPressure from "../components/LineChartBloodPressure";
import dayjs, { Dayjs } from 'dayjs';

const data = {
  labels: ['Red', 'Orange', 'Blue'],
  // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
  datasets: [
      {
        label: 'Popularity of colours',
        data: [55, 23, 96],
        // you can set indiviual colors for each bar
        backgroundColor: [
          'rgba(255, 255, 255, 0.6)',
          'rgba(255, 255, 255, 0.6)',
          'rgba(255, 255, 255, 0.6)'
        ],
        borderWidth: 1,
      }
  ]
}

function Appointments({appointments, onClick}) {
  if (appointments.length <= 0)
      return <p className="text-zinc-500">You have no upcoming appointments.</p>;
  else 
      return (
        appointments.map( appointment =>
          <AppointmentWidePatient date={appointment.date} hour={appointment.hour} name={appointment.doctor.name + " " + appointment.doctor.surname} visitType={appointment.visitType.description} onClick={() => onClick(appointment)} />
        )
      );
}

export default function PatientDashboard({}) {
  
  const [appointments, setAppointments] = useState([]);
  const [chosenDate, setChosenDate] = useState();
  const [highlightedDays, setHighlightedDays] = React.useState([0, 2, 4, 15, 16, 17]);

 const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    getAppointments();
    setIsShown(true);
  }, [isShown])

  let getAppointments = async () => {
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

  const onEditClick = (app) => {
    navigate('/edit_appointment', { state: { 
      appointment: app
    } });
    window.location.reload();
  };

  // const location = useLocation()

  // useEffect(() => {
  //   navigate(0);
  // }, [location.key])

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <PageContainer title="Upcoming appointments">
          <div className="w-full pt-10 grid grid-cols-2 place-start justify-items-start">
            <div className="justify-self-stretch space-y-8">
                <div className="grid grid-cols-1 justify-items-start space-y-8 pb-20">
                <Appointments appointments={appointments} onClick={onEditClick}/>
                <Button color="pink" label="+ Add new appointment" onClick={onAddNewAppointement}/>
                <h1 className="text-2xl font-semibold pt-10 pb-6">Your health</h1>
                <LineChartBloodSugar />
                <LineChartBloodPressure />
                </div>
            </div>
            <div className="justify-self-center">
            <div className="px-20 py-14 bg-greenLight border border-2 border-greenPrimary space-y-6">
              <p className="text-3xl font-bold text-greenPrimary">Calendar</p>
              <Calendar highlightedDays={highlightedDays} chosenDate={chosenDate} onChosenDate={(value) => setChosenDate(value)} />
            </div>
            </div>
          </div>
        </PageContainer>
      </LocalizationProvider>
    );
}