import React, { useState } from "react";
import PageContainer from "../components/PageContainer";
import ClosableHealthResult from "../components/ClosableHealthResult";


export default function PatientHealthResult() {
  const healthResults = [
    {
      num: 1,
      date: '2023-05-29',
      doctorName: 'Jane smith',
      bloodSugar: 120,
      bloodPressure: '120/80',
      heartRate: 75,
      description: '-Cetirizine 10mg, take one tablet daily at bedtime for allergies'
    },
    {
      num: 2,
      date: '2023-06-01',
      doctorName: 'Jane Smith',
      bloodSugar: 110,
      bloodPressure: '130/90',
      heartRate: 68,
      description: '-Ibuprofen 400mg, take one tablet every 6 hours for pain relief.'
    },
  ];

  return (
    <PageContainer title="Your health results">
      <div className="w-full pt-10 grid grid-cols-2 place-start justify-items-start">
          <div className="justify-self-stretch space-y-8 pb-10">
            {healthResults.map((result, index) => (
                <ClosableHealthResult
                    key={index}
                    num={result.num}
                    date={result.date}
                    name = {result.doctorName}
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
