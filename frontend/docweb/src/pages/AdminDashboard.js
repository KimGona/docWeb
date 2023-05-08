import React, { useState } from "react";
import PageContainer from "../components/PageContainer";
import RegisteredAccount from "../components/RegisteredAccount";
import Button from "../components/Button";

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
        accounts.map( it =>
          <RegisteredAccount name={it.name + " " + it.surname} gender={it.gender} phoneNumber={it.phoneNumber} specialty={it.specialty}/>
        )
    );
  }
}

export default function AdminDashboard() {
  const [accounts, setAccounts] = useState([{
    name: "Ross",
    surname: "Can",
    gender: "Male",
    phoneNumber: "456234890",
    specialty: "Neurologist"
  }, 
  {
    name: "Ross",
    surname: "Can",
    gender: "Male",
    phoneNumber: "456234890",
    specialty: "Neurologist"
  }]);
    return (
        <PageContainer title="Registered accounts">
          <div className="flex flex-col space-y-10 w-1/2">
            {Content(accounts)}
          </div>
        </PageContainer>
      );
}