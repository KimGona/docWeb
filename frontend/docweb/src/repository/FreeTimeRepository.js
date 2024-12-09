export default class FreeTimeRepository { 
    static setOffTime = async (data) => {
        try {
            console.log("data");
            console.log(data);
            let requestBody = JSON.stringify(data);

            let res = await fetch('http://localhost:8080/free-times', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: requestBody,
                credentials: 'include',
                mode: 'cors',
                referrerPolicy: 'no-referrer',
                origin: "http://localhost:3000/",
            });
            console.log("res code: " + res.status.toString());

            if (res.status === 200) {
                console.log("success - addidng free time")
                console.log(await res.text());
                return true;
            } else {
                console.log("adding free time failed")
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

}