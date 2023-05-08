import React, { useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import Badge from '@mui/material/Badge';

function ServerDay(props) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  
    const isSelected =
      !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) > 0;
  
    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={isSelected ? <span className="text-pink-700 font-bold">•</span> : undefined}
      >
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      </Badge>
    );
  }

export default function Calendar({highlightedDays, chosenDate, onChosenDate}) {
    const requestAbortController = React.useRef<AbortController | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    // const [highlightedDays, setHighlightedDays] = React.useState([0, 2, 4, 15, 16]);  // first number not rendered, put always first as 0

    const handleMonthChange = (date) => {
        if (requestAbortController.current) {
        requestAbortController.current.abort();
        }

        // setIsLoading(true); // in fetch set loading to false
        // setHighlightedDays([]);
        // fetchHighlightedDays(date); // TODO: implement own fetch
    };

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="bg-white shadow-md">
            <DateCalendar 
            value={chosenDate} 
            onChange={(newValue) => onChosenDate(newValue)} 
            loading={isLoading}
            onMonthChange={handleMonthChange}
            renderLoading={() => <DayCalendarSkeleton />}
            slots={{
                day: ServerDay,
            }}
            slotProps={{
                day: {
                highlightedDays,
                },
            }}
            />
        </div>
      </LocalizationProvider>
    );
};