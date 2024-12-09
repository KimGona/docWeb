import React, { useState, useEffect } from "react";
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { getWeekDatesString } from "../helper/helper";

const getCurrentDate = () => {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${year}-${month}-${day}`;
  console.log(currentDate);
  return currentDate;
};

export default function AppointmentTimeAlternative() {
  const { state } = useLocation();
  const { appointment } = state;

  const [availableTimes, setAvailableTimes] = useState([]);

  const [selectedHour, setSelectedHour] = useState();
  const [chosenDate, setChosenDate] = useState();
  
  const [weekOffset, setWeekOffset] = useState(0);

  
  useEffect(() => {
    getTimes();
  }, [weekOffset])

  const onHourChosen = (event) => {
    console.log(event)
    setSelectedHour(event)
  }

  const navigate = useNavigate();

  const onNextClick = () => {
    if (!selectedHour || !chosenDate) {
      alert("Please select a valid date!")
      return
    }
    let app = { ...appointment }
    app.date = chosenDate
    app.hour = selectedHour
    navigate('/appointment_summary', {
      state: {
        appointment: app
      }
    });
  };

  const onReturnClick = () => {
    navigate(-1);
  };

  const onDateChosen = (date) => {
    // let date = event.$y + "-" + event.$M + "-" + event.$D
    // let date = event.format('YYYY-MM-DD');
    console.log(date);
    setChosenDate(date)
  };

  let getTimes = async () => {
    console.log("getTimes called")
    try {
      let res = await fetch('http://localhost:8080/schedule-times/doctor/' + appointment.doctor.id + '/dates/' + getWeekDatesString(weekOffset), {
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
        setAvailableTimes(list);
      } else {
        console.log("get times failed");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handlePrevWeek = () => {
    setWeekOffset(weekOffset-1)
  };

  const handleNextWeek = () => {
    setWeekOffset(weekOffset+1)
  };

  const handleHourClick = (date, hour) => {
    onDateChosen(date);
    onHourChosen(hour);
  };

  return (
    <PageContainer title="Add appointment">
      {/* Summary bar */}
      <div className="fixed right-0 top-0 h-full w-[300px] bg-zinc-300 p-10">
        <div className="relative py-10 px-2 flex flex-col gap-y-10">
          <p className="text-zinc-700 font-semibold text-3xl">Summary</p>
          <div>
            <p className="text-zinc-700 text-thin text-xl">Chosen doctor</p>
            <p className="text-black text-medium text-2xl">{`${appointment.doctor.name} ${appointment.doctor.surname}`}</p>
          </div>

          <div>
            <p className="text-zinc-700 text-thin text-xl">Visit type</p>
            <p className="text-black text-medium text-2xl">{appointment.visitType.description}</p>
          </div>

          <div>
            <p className="text-zinc-700 text-thin text-xl">Date</p>
            <p className="text-black text-medium text-2xl">{chosenDate}</p>
          </div>

          <div>
            <p className="text-zinc-700 text-thin text-xl">Hour</p>
            <p className="text-black text-medium text-2xl">{selectedHour ? `${selectedHour}:00` : ""}</p>
          </div>
        </div>

        <div className="fixed right-20 bottom-10">
          <div className="relative">
            <div className="flex flex-col items-center gap-y-4">
              <Button color="green outline big" label="Return" onClick={onReturnClick} />
              <Button color="pink big" label="Next" onClick={onNextClick} />
            </div>
            <a className="pt-6 underline text-sm text-medium" href="/">Cancel</a>
          </div>
        </div>
      </div>

        {/* Screen content */}
        <div className="pr-80 pt-10 w-full bg-gray-100">
      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mb-4">
        {weekOffset > 0 ? (
        <button
          onClick={handlePrevWeek}
          className="text-gray-800 bg-white px-4 py-2 rounded-full shadow-md hover:bg-gray-200"
        >
          ← Previous
        </button>
        ) : (<div></div>)}
        <button
          onClick={handleNextWeek}
          className="text-gray-800 bg-white px-4 py-2 rounded-full shadow-md hover:bg-gray-200"
        >
          Next →
        </button>
      </div>
      <div className="grid grid-rows-7 divide-y">
        {availableTimes.map((day, index) => (
          <div
            key={index}
            className="flex flex-row items-center gap-2 p-2 sm:p-4 bg-gray-50 even:bg-gray-100"
          >
            <div className="flex-none w-24 sm:w-32 text-gray-800 font-bold text-center">
                <div>{day.name}</div>
                <div className="text-sm text-gray-600">{day.date}</div>
            </div>

            {/* Hours List */}
            <div className="flex-1 flex gap-2 overflow-x-auto">
                {day.hours.length > 0 ? (
                  day.hours.map((hour, idx) => (
                    <div
                      key={idx}
                      className={`py-2 px-4 text-center border rounded bg-white hover:bg-gray-200 cursor-pointer text-sm
                        ${
                          chosenDate === day.date &&
                          selectedHour === hour
                            ? "bg-blue-200 border-blue-500"
                            : "bg-white hover:bg-gray-200"
                        }`}
                      onClick={() => handleHourClick(day.date, hour)}
                    >
                      {`${hour}:00`}
                    </div>
                  ))
                ) : (
                  <div className="py-2 px-4 text-gray-500 italic">
                    No hours available
                  </div>
                )}
              </div>
            </div>
        ))}
      </div>
      </div>
    </PageContainer>
  );
}