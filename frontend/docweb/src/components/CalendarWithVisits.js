import React, { useState } from "react";
import Calendar from "./Calendar";

function AppointmentCompact({date, hour, visitType}) {
    return (
        <div>
            <p className="text-greenSecondary">{date} at {hour}</p>
            <p className="text-md font-medium">{visitType}</p>
        </div>
    );
}

export default function CalendarWithVisits({highlightedDays, chosenDate, onChosenDate, appointments}) {
    return (
        <div className="px-20 py-14 bg-greenLight border border-2 border-greenPrimary space-y-6">
            <p className="text-3xl font-bold text-greenPrimary">Calendar</p>
            <Calendar highlightedDays={highlightedDays} chosenDate={chosenDate} onChosenDate={onChosenDate} />
            {
                appointments.map( appointment =>
                    <AppointmentCompact date={appointment.date} hour={appointment.hour} visitType={appointment.visitType.description}/>
                )
            }
        </div>
    );
};