import { getWeekDatesString } from "../helper/helper";

export default class ScheduleTimeRepository { 
    static getAvailableTimesForCurrentDoctor = async (weekOffset) => {
        console.log("getTimes called")
        try {
            console.log("daysss");
            console.log(getWeekDatesString(weekOffset));
          let res = await fetch('http://localhost:8080/schedule-times/current-doctor/dates/' + getWeekDatesString(weekOffset), {
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
            return list;
          } else {
            console.log("get times failed");
            return [];
          }
        } catch (error) {
          console.log(error);
          return [];
        }
      }

}