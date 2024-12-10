
export default class HealthResultRepository { 
    static getHealthResults = async (month, year) => {
        try {
          let res = await fetch(`http://localhost:8080/health-results/doctor/month/${month}/year/${year}`, {
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
            console.log("get health results succeeded");
            let list = await res.json();
            console.log(list);
            return list;
          } else {
            console.log("get health results failed");
            return [];
          }
        } catch (error) {
          console.log(error);
          return [];
        }
      }
}