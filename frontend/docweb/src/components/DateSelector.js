import React, { useState } from 'react';
import { getTodaysMonth, getTodaysYear } from "../helper/helper";

function DateSelector({ onDateChange, beforeYears=10, totalYears=11}) {
    const [month, setMonth] = useState(getTodaysMonth());
    const [year, setYear] = useState(getTodaysYear());

    const months = [
        { value: 1, label: 'January' },
        { value: 2, label: 'February' },
        { value: 3, label: 'March' },
        { value: 4, label: 'April' },
        { value: 5, label: 'May' },
        { value: 6, label: 'June' },
        { value: 7, label: 'July' },
        { value: 8, label: 'August' },
        { value: 9, label: 'September' },
        { value: 10, label: 'October' },
        { value: 11, label: 'November' },
        { value: 12, label: 'December' }
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: totalYears }, (_, i) => currentYear - beforeYears + i);

    const handleMonthChange = (e) => {
        const newMonth = Number(e.target.value);
        setMonth(newMonth);
        if (onDateChange) {
            onDateChange(newMonth, year);
        }
    };

    const handleYearChange = (e) => {
        const newYear = Number(e.target.value);
        setYear(newYear);
        if (onDateChange) {
            onDateChange(month, newYear);
        }
    };

    return (
        <div className="flex flex-row gap-4">
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="month">Month:</label>
                <select
                    id="month"
                    value={month || ''}
                    onChange={handleMonthChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select Month</option>
                    {months.map((month) => (
                        <option key={month.value} value={month.value}>
                            {month.label}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="year">Year:</label>
                <select
                    id="year"
                    value={year || ''}
                    onChange={handleYearChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select Year</option>
                    {years.map((yearValue) => (
                        <option key={yearValue} value={yearValue}>
                            {yearValue}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default DateSelector;