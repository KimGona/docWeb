import React, { useState, useEffect } from "react";
import PageContainer from "../components/PageContainer";
import ClosableHealthResult from "../components/ClosableHealthResult";


export default function PatientHealthResult() {
  const [healthResults, setHealthResults] = useState([]);

  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    getHealthResults();
    setIsShown(true);
  }, [isShown])

  let getHealthResults = async () => {
    try {
      let res = await fetch('http://localhost:8080/health-results/patient', {
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
        console.log("get health results succeeded");
        let list = await res.json();
        console.log(list);
        setHealthResults(list);
      } else {
        console.log("get health results failed");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <PageContainer title="Your health results">
      <div className="w-full pt-10 grid grid-cols-2 place-start justify-items-start">
          <div className="justify-self-stretch space-y-8 pb-10">
            {healthResults.map((result, index) => (
                <ClosableHealthResult
                    key={index}
                    num={index + 1}
                    date={result.dateAdded}
                    name = {result.patient.name + " " + result.patient.surname}
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
