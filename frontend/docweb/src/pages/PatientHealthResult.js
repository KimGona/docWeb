import React, { useState, useEffect } from "react";
import PageContainer from "../components/PageContainer";
import ClosableHealthResult from "../components/ClosableHealthResult";

export default function PatientHealthResult() {
  const [healthResults, setHealthResults] = useState([]);

  useEffect(() => {
    getHealthResults();
  }, []);

  const getHealthResults = async () => {
    try {
      const res = await fetch('http://localhost:8080/health-results/patient/${id}', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        mode: 'cors',
        referrerPolicy: 'no-referrer',
      });

      if (res.status === 200) {
        console.log("Get health results succeeded");
        const list = await res.json();
        console.log(list);
        setHealthResults(list);
      } else {
        console.log("Get health results failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageContainer title="Your health results">
      <div className="w-full pt-10 grid grid-cols-2 place-start justify-items-start">
        <div className="justify-self-stretch space-y-8 pb-10">
          {healthResults.map((result, index) => (
            <ClosableHealthResult
              key={index}
              num={result.num}
              date={result.date}
              name={result.doctorName}
              bloodSugar={result.bloodSugar}
              bloodPressure={result.bloodPressure}
              heartRate={result.heartRate}
              description={result.description}
            />
          ))}
        </div>
      </div>
    </PageContainer>
  );
}