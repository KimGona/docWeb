import React, { useState } from "react";
import Calendar from "./Calendar";

function AppointmentCompact({hour, visitType}) {
    return (
        <div>
            <p className="text-greenSecondary">at {hour}</p>
            <p className="text-md font-medium">{visitType}</p>
        </div>
    );
}

export default function CalendarWithVisits({highlightedDays, chosenDate, onChosenDate}) {
    const [appointmets, setAppointments] = useState([{
            hour: "9:00",
            visitType: "Regular checkup",
        }, 
        {
            hour: "10:00",
            visitType: "Dentist checkup",
        }, 
        {
            hour: "13:00",
            visitType: "Eye surgery",
        }]);

    return (
        <div className="px-20 py-14 bg-greenLight border border-2 border-greenPrimary space-y-6">
            <p className="text-3xl font-bold text-greenPrimary">Calendar</p>
            <Calendar highlightedDays={highlightedDays} chosenDate={chosenDate} onChosenDate={onChosenDate} />
            {
                appointmets.map( appointment =>
                    <AppointmentCompact hour={appointment.hour} visitType={appointment.visitType}/>
                )
            }
        </div>
    );
};