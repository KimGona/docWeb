import React, { useState, useEffect } from "react";
import PageContainer from "../components/PageContainer";
import TextWithTitle from "../components/TextWithTitle";
import Button from "../components/Button";

export default function PatientAccount({ onLogout }) {
    const [isShown, setIsShown] = useState(false);
    const [user, setUser] = useState({
        name: "",
        surname: "",
        gender: "",
        dateOfBirth: "",
        address: {
            street: "",
            streetNumber: 0,
            city: "",
            code: ""
        }
    });

    useEffect(() => {
        getUser();
        setIsShown(true);
    }, [isShown])

    let getUser = async () => {
        try {
            let res = await fetch('http://localhost:8080/patient/id', {
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
                setUser(list);
            } else {
                console.log("get appointments failed");
            }
        } catch (error) {
            console.log(error);
        }
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
                    {/* <TextWithTitle title="Username" content="Mat11" /> */}
                    <div></div>

                    <TextWithTitle title="Gender" content={user.gender} />
                    <TextWithTitle title="Date of birth" content={user.dateOfBirth} />
                    <TextWithTitle title="Address" content={user.address.street + " " + user.address.streetNumber + " " +user.address.city + " " + user.address.code} />
                </div>
            </div>
        </PageContainer>
    );
}