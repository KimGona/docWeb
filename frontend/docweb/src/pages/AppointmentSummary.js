import React, { useState } from "react";
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import SummaryItem from "../components/SummaryItem";
import TranslateAlert from "../components/alerts/TranslateAlert";

function getTimeDesc(hour) {
  if (hour < 12) return "am";
  else return "pm"
}

export default function AppointmentSummary() {
  const { state } = useLocation();
  const { appointment } = state;

  const navigate = useNavigate();

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

  const onConfirmAppointment = async (event) => {
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
        console.log("appointment comfirmation failed")
        setAlert("error", "Could not confirm the appointment.");
      }
    } catch (error) {
      console.log(error);
      setAlert("error", "Could not confirm the appointment.")
    }
  }

  return (
    <PageContainer title="Add appointment">
      <div className="pr-[700px] pt-10 w-full flex flex-col gap-x-10 justify-items-start">
        <TranslateAlert isVisible={result.isVisible} type={result.value} message={result.message} onClose={resetResult} />
        <p className="text-3xl font-thin pb-6">Confirmation</p>
        <SummaryItem
          topText="Your specialist"
          middleText={"Dr " + appointment.doctor.name + " " + appointment.doctor.surname}
          bottomText={appointment.doctor.specialty}
          onClick={() => onChangeClick("/appointment_doctors")}
        />
        <SummaryItem
          topText="Type of visit"
          middleText={appointment.visitType.name}
          onClick={() => onChangeClick("/appointment_visit_types")}
        />
        <SummaryItem
          topText="Date and time"
          middleText={appointment.date}
          bottomText={appointment.hour + " " + getTimeDesc(appointment.hour)}
          onClick={() => onChangeClick("/appointment_time")}
        />
        <div className="flex flex-row gap-8 items-end pt-20">
          <Button color="pink big" label="Confirm appointment" onClick={onConfirmAppointment} />
          <a className="underline text-lg text-medium" href="/">Cancel</a>
        </div>
      </div>
    </PageContainer>
  );
}