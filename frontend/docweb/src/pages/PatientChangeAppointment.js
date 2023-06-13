import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import SummaryItem from "../components/SummaryItem";
import Calendar from "../components/Calendar";
import AvailableHours from "../components/AvailableHours";

function getTimeDesc(hour) {
  if (hour < 12) return "am";
  else return "pm";
}

const getCurrentDate = () => {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${year}-${month}-${day}`;
  console.log(currentDate);
  return currentDate;
};


export default function PatientChangeAppointment() {
  const { state } = useLocation();
  const { appointment } = state;



   const getInitialHour = () => {
     if (typeof appointment.hour !== "undefined" && appointment.hour !== 0)
       return appointment.hour;
     else if (hours.length > 0)
       return hours[0];
     else
       return 0;
   };

  const onDateChosen = (event) => {
    let date = event.$y + "-" + event.$M + "-" + event.$D;
    console.log(date);
    setChosenDate(date);
  };

  const [hours, setHours] = useState([]);
  const [selectedHour, setSelectedHour] = useState(getInitialHour());

  useEffect(() => {
    if (selectedHour === 0) {
      setSelectedHour(getInitialHour());
    }
  }, [hours])

  const [chosenDate, setChosenDate] = useState();
  const [highlightedDays, setHighlightedDays] = useState([0, 2, 4, 15, 16, 17]);

  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    getTimes();
    setIsShown(true);
  }, [isShown, chosenDate])


  const onHourChosen = (event) => {
    console.log(event);
    setSelectedHour(event);
  };

 const navigate = useNavigate();

 let getTimes = async () => {
     if (chosenDate === undefined) return;
     try {
       let res = await fetch('http://localhost:8080/schedule-times/doctor/' + appointment.doctor.id + '/date/' + chosenDate, {
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
         console.log("get times succeeded");
         let list = await res.json();
         console.log(list);
         setHours(list);
       } else {
         console.log("get times failed");
       }
     } catch (error) {
       console.log(error);
     }
   }

  const onChangeClick = (path) => {
    navigate(path, {
      state: {
        appointment: appointment
      }
    });
  };

  const [result, setResult] = useState({
    value: "",  // 'success' or 'error'
    isVisible: false,
    message: "",
  });
 const onResultChange = (obj) => setResult(obj);
  const resetResult = () => {
    let obj = {
      value: "",
      isVisible: false,
      message: "",
    };
    onResultChange(obj);
  }

  function getResult(type, message) {
    let obj = {
      value: type,
      isVisible: true,
      message: message
    };
    return obj;
  }

  const setAlert = (type, isVisible, message) => {
    onResultChange(getResult(type, isVisible, message));
  }


  const onConfirmChange = async (event) => {
    //let app = { ...appointment };
    //app.date = chosenDate;
    //app.hour = selectedHour;
    //navigate('/');
    //window.location.reload();
    event.preventDefault();
    try {
      let requestBody = JSON.stringify(appointment);

      let res = await fetch('http://localhost:8080/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: requestBody,
        credentials: 'include',
        mode: 'cors',
        referrerPolicy: 'no-referrer',
        origin: "http://localhost:3000/",
      });

      if (res.status === 200) {
        navigate('/appointment_confirmation');
        window.location.reload();
      } else {
        console.log("appointment confirmation failed");
        setAlert("error", "Could not confirm the appointment.");
      }
    } catch (error) {
      console.log(error);
      setAlert("error", "Could not confirm the appointment.");
    }
  };

  const onReturn = () => {
    navigate(-1);
  };

  return (
    <PageContainer title="Add appointment">
      <div className="pr-[700px] w-full flex flex-col gap-x-10 justify-items-start">
        <SummaryItem
          topText="Your specialist"
          middleText={"Dr " + appointment.doctor.name + " " + appointment.doctor.surname}
          bottomText={appointment.doctor.specialty}
          isButtonVisible={false}
        />
        <SummaryItem
          topText="Type of visit"
          middleText={appointment.visitType.description}
          isButtonVisible={false}
        />
        <div className="pt-10 w-full grid grid-cols-2 gap-x-10 justify-items-start">
          <div>
            <p className="text-2xl font-medium pb-10">Pick a date</p>
            <div className="justify-self-center bg-greenLight border border-2 border-greenPrimary space-y-6">
              <Calendar highlightedDays={highlightedDays} chosenDate={chosenDate} onChosenDate={onDateChosen} />
            </div>
          </div>
          <div>
            <p className="text-2xl font-medium pb-10">Available hours</p>
            <AvailableHours hours={hours} selectedHour={selectedHour} setSelectedHour={onHourChosen} />
          </div>
        </div>
        <div className="py-6 flex flex-row gap-x-6 align-center items-center">
          <Button color="pink big" label="Confirm" onClick={onConfirmChange} />
          <Button color="pink outline big" label="Cancel" onClick={onReturn} />
        </div>
      </div>
    </PageContainer>
  );
}
