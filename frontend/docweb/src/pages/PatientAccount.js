import React, { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import TextWithTitle from "../components/TextWithTitle";
import Button from "../components/Button";

export default function PatientAccount({  onLogout }) {
  const [isShown, setIsShown] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getAccountInfo();
    getUserDetails();
    setIsShown(true);
  }, [isShown]);

  const getAccountInfo = async () => {
    try {
      const userIdResponse = await fetch('http://localhost:8080/patient/id', {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        referrerPolicy: 'no-referrer',

      });

      if (userIdResponse.status === 200) {
        console.log("Get account information succeeded");
        const id = await userIdResponse.text();
        console.log("userId: " + id);
        getUserDetails(id);
      } else {
        console.log("Get account information failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserDetails = async (id) => {
    try {
      const userDetailsResponse = await fetch('http://localhost:8080/users/${id}', {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        referrerPolicy: 'no-referrer',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (userDetailsResponse.status === 200) {
        console.log("Get user details succeeded");
        const userDetails = await userDetailsResponse.json();
        console.log(userDetails);
        setUser(userDetails);
      } else {
        console.log("Get user details failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer title="Your account details">
      <div className="absolute right-0 pr-10">
        <Button color="pink outline" label="Log out" onClick={onLogout} />
      </div>
      <div>
        <p className="text-2xl font-medium py-4">Personal details</p>
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          <TextWithTitle title="Name" content={user.name} />
          <TextWithTitle title="Surname" content={user.surname} />
          <TextWithTitle title="Username" content={user.username} />
          <div></div>

          <TextWithTitle title="Gender" content={user.gender} />
          <TextWithTitle title="Date of birth" content={user.dateOfBirth} />
          <TextWithTitle title="Address" content={user.address} />
        </div>
      </div>
    </PageContainer>
  );
}
