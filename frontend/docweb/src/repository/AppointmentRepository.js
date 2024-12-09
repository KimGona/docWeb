
export default class AppointmentRepository { 
    static  getAppointments = async (month, year) => {
        try {
          let res = await fetch('http://localhost:8080/appointments/doctor/month/' + month + "/year/" + year, {
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
            console.log("get appointments succeeded");
            let list = await res.json();
            console.log(list);
            return list;
          } else {
            console.log("get appointments failed");
            return [];
          }
        } catch (error) {
          console.log(error);
          return [];
        }
      }
}