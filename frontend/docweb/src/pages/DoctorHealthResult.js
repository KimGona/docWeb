import React, { useState, useEffect } from "react";
import PageContainer from "../components/PageContainer";
import ClosableHealthResult from "../components/ClosableHealthResult";
import HealthResultRepository from "../repository/HealthResultRepository";
import DateSelector from "../components/DateSelector";
import { getTodaysMonth, getTodaysYear } from "../helper/helper";


export default function DoctorHealthResult() {
  const [healthResults, setHealthResults] = useState([]);
  
  const [selectedMonth, setSelectedMonth] = useState(getTodaysMonth());
  const [selectedYear, setSelectedYear] = useState(getTodaysYear());

  useEffect(() => {
    getHealthResults();
  }, [selectedMonth, selectedYear])

  let getHealthResults = async () => {
    let list = await HealthResultRepository.getHealthResults(selectedMonth, selectedYear);
    setHealthResults(list);
  }

  const handleDateChange = (month, year) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  return (
    <PageContainer title="Your health results">
      <p className="text-lg font-normal text-gray-500">View all of the health results you have filled out.</p>
      <div className="w-full pt-10 flex flex-col gap-4">
        <div>
          <p className="text-xl font-semibold">Select month</p>
          <p className="text-md font-normal text-gray-500">Select the month and year to view the appointments which took place in that time.</p>
        </div> 
          <DateSelector onDateChange={handleDateChange} />
          <div className="justify-self-stretch space-y-8 pb-10">
            {healthResults.length > 0 ? healthResults.map((result, index) => (
                <ClosableHealthResult
                    key={index}
                    num={index + 1}
                    date={result.dateAdded}
                    name = {result.patient.name + " " + result.patient.surname}
                    bloodSugar = {result.bloodSugar}
                    bloodPressure = {result.bloodPressure}
                    heartRate = {result.heartRate}
                    description = {result.description}
                    isForPatient = {false}
                 />
            )) : <p className="text-lg font-normal">There are no health results yet. You can fill out the health results for each appointment in the <i>Write health results</i> tab.</p>}
          </div>
      </div>
    </PageContainer>
  );
}