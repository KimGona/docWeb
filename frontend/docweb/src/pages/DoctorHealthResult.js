import React, { useState } from "react";
import PageContainer from "../components/PageContainer";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Calendar from "../components/Calendar";
import AppointmentWidePatient from "../components/AppointmentWidePatient";
import NavButton from "../components/navigation_components/NavButton";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ClosableHealthResult from "../components/HealthResultViewForDoc";


export default function DoctorHealthResult() {
  const healthResults = [
    {
      num: 1,
      date: '2023-05-29',
      patientName: 'Alan Walker',
      bloodSugar: 120,
      bloodPressure: '120/80',
      heartRate: 75,
      description: '-Cetirizine 10mg, take one tablet daily at bedtime for allergies.'
    },
    {
      num: 2,
      date: '2023-06-01',
      patientName: 'Jane Smith',
      bloodSugar: 110,
      bloodPressure: '130/90',
      heartRate: 68,
      description: "-Ibuprofen 400mg, take one tablet every 6 hours for pain relief."
    },
  ];

  return (
    <PageContainer title="Your helath results">
      <div className="w-full pt-10 grid grid-cols-2 place-start justify-items-start">
          <div className="justify-self-stretch space-y-8">
            {healthResults.map((result, index) => (
                <ClosableHealthResult
                    key={index}
                    num={result.num}
                    date={result.date}
                    patientName = {result.patientName}
                    bloodSugar = {result.bloodSugar}
                    bloodPressure = {result.bloodPressure}
                    heartRate = {result.heartRate}
                    description = {result.description}
                 />
            ))}


          </div>
      </div>
    </PageContainer>


  );
}
