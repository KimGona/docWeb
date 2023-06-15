import React, { useState, useEffect } from "react";
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import RegisteredDoctorAccount from "../components/RegisteredAccount";
import RegisteredAdminAccount from "../components/RegisteredAdminAccount";

function Accounts({user}) {
  if (user.doctor !== 'undefined')
    return <RegisteredDoctorAccount name={user.doctor.name + " " + user.doctor.surname} gender={user.doctor.gender} phoneNumber={user.doctor.phoneNumber} specialty={user.doctor.speciality}/>
  else
    return <RegisteredAdminAccount user={user} />
}

function Content(accounts) {
  if (accounts.length <= 0) {
    return (
      <div className="flex flex-col space-y-10 w-1/2">
        <p className="text-gray-700 text-xl font-thin">There are no registered accounts.</p>
        <Button color="pink outline xl" label="+ Add new doctor" />
        <Button color="green outline xl" label="+ Add new admin" />
      </div>
    );
  } else {
    return (
        accounts.map( it => <Accounts user={it} /> )
    );
  }
}

export default function AdminDashboard() {
  const [accounts, setAccounts] = useState([]);

  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    getUsers();
    setIsShown(true);
  }, [isShown])

  let getUsers = async () => {
    try {
      let res = await fetch('http://localhost:8080/users/id', {
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
        console.log("get users succeeded");
        let list = await res.json();
        console.log(list);
        setAccounts(list);
      } else {
        console.log("get users failed");
      }
    } catch (error) {
      console.log(error);
    }
  }

    return (
        <PageContainer title="Registered accounts">
          <div className="flex flex-col space-y-10 w-1/2">
            {Content(accounts)}
          </div>
        </PageContainer>
      );
}