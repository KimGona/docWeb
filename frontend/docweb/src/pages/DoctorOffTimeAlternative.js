import React, { useState, useEffect } from "react";
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { getWeekDatesString } from "../helper/helper";
import ColoredText from "../components/ColoredText";
import Spacer from "../components/Spacer";
import FreeTimeRepository from "../repository/FreeTimeRepository";
import ScheduleTimeRepository from "../repository/ScheduleTimeRepository";

export default function DoctorOffTimeAlternative() {
  const [availableTimes, setAvailableTimes] = useState([]);

  // Date and list of hours
  const [selectedHours, setSelectedHours] = useState([]);
  
  const [weekOffset, setWeekOffset] = useState(0);

  const scheduleOffTime = [
    { name: "Monday", date: "2024-12-04", schedule: "9:00 - 15:00", hours: [{value: 9, isTaken: false}, {value: 10, isTaken: true, isFree: true}] }, // isTaken - either free or taken by appointment
    { name: "Tuesday", date: "2024-12-05", schedule: "9:00 - 15:00", hours: [{value: 9, isTaken: false}, {value: 10, isTaken: true}] },
    { name: "Wednesday", date: "2024-12-06", schedule: "9:00 - 15:00", hours: [{value: 9, isTaken: false}, {value: 10, isTaken: false}, {value: 11, isTaken: false}, {value: 12, isTaken: false}, {value: 13, isTaken: false}, {value: 14, isTaken: false}, {value: 15, isTaken: false}] },
    { name: "Thursday", date: "2024-12-07", schedule: "9:00 - 15:00", hours: [{value: 9, isTaken: false}, {value: 10, isTaken: true}] },
    { name: "Friday", date: "2024-12-08", schedule: "9:00 - 15:00", hours: [{value: 9, isTaken: false}, {value: 10, isTaken: true}] },
    { name: "Saturday", date: "2024-12-09", schedule: "9:00 - 15:00", hours: [{value: 9, isTaken: false}, {value: 10, isTaken: true}] },
    { name: "Sunday", date: "2024-12-10", schedule: "9:00 - 15:00", hours: [{value: 9, isTaken: false}, {value: 10, isTaken: true}] },
];
    
  useEffect(() => {
    getTimes();
  }, [weekOffset])

  const navigate = useNavigate();

  const onReturnClick = () => {
    navigate(-1);
  };

  const getTimes = async () => {
    let result = await ScheduleTimeRepository.getAvailableTimesForCurrentDoctor(weekOffset);
    setAvailableTimes(result);
  }

  const setOffTime = async (event) => {
    event.preventDefault();
    let data = selectedHours.map(s => {
        return {
            date: s.date,
            timeList: s.hours.map(t => getTimeMapped(t)),
        }
    })
    let result = await FreeTimeRepository.setOffTime(data);
    if (result === true) {
        // alert
        navigate(-1);
    } else {
        // also alert
    }
  }

    function getTimeMapped(time) {
        let obj = {
            hour: time
        }
        return obj;
    }

  const toggleHour = (date, hour) => {
    setSelectedHours((prevSelected) => {
      // Find the entry for the given date
      const dateEntry = prevSelected.find((item) => item.date === date);
  
      if (dateEntry) {
        // If the hour is already selected, remove it
        if (dateEntry.hours.includes(hour)) {
          const updatedHours = dateEntry.hours.filter((h) => h !== hour);
  
          // If no hours are left, remove the date entry
          if (updatedHours.length === 0) {
            return prevSelected.filter((item) => item.date !== date);
          }
  
          // Update the entry with remaining hours
          return prevSelected.map((item) =>
            item.date === date ? { ...item, hours: updatedHours } : item
          );
        } else {
          // If the hour is not already selected, add it
          return prevSelected.map((item) =>
            item.date === date ? { ...item, hours: [...item.hours, hour] } : item
          );
        }
      } else {
        // If the date is not yet in the list, add it with the hour
        return [...prevSelected, { date, hours: [hour] }];
      }
    });
  };

  const handlePrevWeek = () => {
    setWeekOffset(weekOffset-1)
  };

  const handleNextWeek = () => {
    setWeekOffset(weekOffset+1)
  };

  const getSelectedDatesWithHours = () => {
    return selectedHours.filter((item) => item.hours.length > 0);
  }

  const isHourSelected = (date, hour) => {
    const selectedDate = selectedHours.find((item) => item.date === date);
    return selectedDate?.hours.includes(hour) ?? false;
  };

  return (
    <PageContainer title="Add appointment">
      {/* Summary bar */}
      <div className="fixed right-0 top-0 h-full w-[300px] bg-zinc-300 p-10">
        <div className="relative py-10 px-2 flex flex-col gap-y-10">
                <h2 className="text-lg font-bold mb-4">Selected Hours</h2>
                <div className="space-y-4">
                {getSelectedDatesWithHours().map((item) => (
                    <div
                    key={item.date}
                    className="flex flex-col items-center gap-4 p-4 border rounded-lg"
                    >
                    <div className="font-bold">{item.date}</div>
                    <div className="flex flex-wrap gap-2">
                        {item.hours.map((hour) => (
                        <span
                            key={`${hour.date}:${hour}`}
                            className="px-3 py-1 bg-blue-200 text-blue-800 font-normal text-sm rounded-lg"
                        >
                            {`${hour}:00`}
                        </span>
                        ))}
                    </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="fixed right-20 bottom-10">
          <div className="relative">
            <div className="flex flex-col items-center gap-y-4">
              <Button color="pink big" label="Confirm" onClick={setOffTime} />
            </div>
            <a className="pt-6 underline text-sm text-medium" href="/check_schedule">Cancel</a>
          </div>
        </div>
      </div>

        {/* Screen content */}
        <div className="pr-80 pt-10 w-full ">
      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mb-4">
        {weekOffset > 0 ? (
        <button
          onClick={handlePrevWeek}
          className="text-gray-800 bg-sky-200 px-4 py-2 rounded-full shadow-md hover:bg-gray-200"
        >
          ← Previous
        </button>
        ) : (<div></div>)}
        <button
          onClick={handleNextWeek}
          className="text-gray-800 bg-sky-200 px-4 py-2 rounded-full shadow-md hover:bg-gray-200"
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
                <Spacer />
                <ColoredText text="Schedule" bgColor="bg-blue-500" />
                <Spacer />
                <div>{day.schedule}</div>
            </div>

            <ColoredText text="Select whole day" bgColor="#8AF0C2" />

            {/* Hours List */}
            <div className="flex-1 flex gap-2 overflow-x-auto">
                {day.hours.length > 0 ? (
                  day.hours.map((hour, idx) => (
                    <div
                      key={idx}
                      className={`py-2 px-4 text-center border rounded text-sm
                        ${
                          hour.taken || hour.free
                          ? "bg-gray-300 cursor-not-allowed"
                          : isHourSelected(day.date, hour.value)
                          ? "bg-blue-200 border-blue-500 cursor-pointer hover:bg-gray-200"
                          : "bg-white hover:bg-gray-200 cursor-pointer hover:bg-gray-200"
                        }`}
                      onClick={!hour.free && !hour.taken ? () => toggleHour(day.date, hour.value) : null}
                    >
                      {`${hour.value}:00`}
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