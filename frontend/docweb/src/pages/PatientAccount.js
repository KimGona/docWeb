import React, { useState } from "react";
import PageContainer from "../components/PageContainer";
import TextWithTitle from "../components/TextWithTitle";
import Button from "../components/Button";

export default function PatientAccount({onLogout}) {
    return (
        <PageContainer title="Your account details">
            <div className="absolute right-0 pr-10">
                <Button color="pink outline" label="Log out" onClick={onLogout}/>
            </div>
            <div>
                <p className="text-2xl font-medium py-4">Personal details</p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                    <TextWithTitle title="Name" content="Simon"/>
                    <TextWithTitle title="Surname" content="Mat" />
                    <TextWithTitle title="Username" content="Mat11" />
                    <div></div>

                    <TextWithTitle title="Gender" content="Male" />
                    <TextWithTitle title="Date of birth" content="2000-05-16"/>
                    <TextWithTitle title="Address" content="ul. Czekoladowa 42/1" />
                </div>
            </div>
        </PageContainer>
    );
}