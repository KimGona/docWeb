import React, { useState } from "react";
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function getTimeDesc(hour) {
    if (hour < 12) return "am";
    else return "pm"
}

function SummaryItem({topText, middleText, bottomText, onClick}) {
  return (
    <div className="w-full pt-4">
        
        <div className="w-full grid grid-cols-2 justify-items-start pt-4">
            <div className="flex flex-col">
                <p className="text-xl font-normal pb-6">{topText}</p>
                <h3 className="text-3xl font-medium pb-2">{middleText}</h3>
                <p className="text-xl font-normal text-zinc-700">{bottomText}</p>
                <div className="py-2"></div>
            </div>
            <div className="justify-self-end">
                <Button color="pink outline" label="Change" onClick={onClick} />
            </div>
        </div>
        
        <hr class="w-full bg-zinc-400 border-0 dark:bg-gray-700 pt-[1px]" />
    </div>
  );
}

export default function AppointmentSummary() {
  const {state} = useLocation();
  const { appointment } = state;

  const navigate = useNavigate();
  
  const onChangeClick = (path) => {
    navigate(path, { state: { 
      appointment: appointment
    } });
  };

  const onConfirmAppointment = () => {
    navigate('/appointment_confirmation');
  };

    return (
        <PageContainer title="Add appointment">
          <div className="pr-[700px] pt-10 w-full flex flex-col gap-x-10 justify-items-start">
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