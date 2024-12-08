export function getWeekDates(weekOffset) {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(today);  
    monday.setDate(today.getDate() + weekOffset*7 + diffToMonday);
  
    const weekDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      return date;
    });
  
    return weekDates;
}

export function getWeekDatesString(weekOffset) {
    const weekDates = getWeekDates(weekOffset);
    const formattedDates = weekDates.map(formatDateToString);
    return formattedDates.join(',');
}

function formatDateToString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}