import React, { useState } from "react";
import PageContainer from "../components/PageContainer";
import TextWithTitle from "../components/TextWithTitle";
import WorkSchedule from "../components/WorkSchedule";
import VisitTypesGrid from "../components/VisitTypesGrid";
import VisitTypesDialog from "../components/dialogs/VisitTypesDialog";
import Button from "../components/Button";
import WorkScheduleDialog from "../components/dialogs/WorkScheduleDialog";

export default function PatientAccount({}) {

    return (
        <PageContainer title="Your account details">
            <div className="grid grid-cols-2 gap-y-20 gap-x-60 pt-4">
                <div>
                <p className="text-2xl font-medium pb-4">Personal details</p>
                <div className="grid grid-cols-2 gap-x-16 gap-y-6">
                    <TextWithTitle title="Name" content="Alan"/>
                    <TextWithTitle title="Surname" content="Walker" />
                    <TextWithTitle title="Username" content="Alan234" />
                    <div></div>

                    <TextWithTitle title="Gender" content="Male" />
                    <TextWithTitle title="Phone number" content="+48 123 456 789"/>
                        <TextWithTitle title="Date of birth" content="10.05.1987" />
                    <div className="col-span-2">
                        <TextWithTitle title="Address" content="Czekoladowa 42 Wroclaw" />
                    </div>
                </div>
                </div>


            </div>
        </PageContainer>
    );
}