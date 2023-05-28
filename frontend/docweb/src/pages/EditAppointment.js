import React, { useState } from "react";
import PageContainer from "../components/PageContainer";
import TextWithTitle from "../components/TextWithTitle";
import Calendar from "../components/Calendar";

import Button from "../components/Button";




export default function EditAppointment({}) {

    const [chosenDate, setChosenDate] = useState();
    const [highlightedDays, setHighlightedDays] = React.useState();

    return (
         <PageContainer title="Change Appointment">
         <div className="space-y-6 gap-y-20">
         <p className="text-xl"> Your Specialist </p>
          <TextWithTitle title="Neurologist" content="Dr Alan Walker" />
           <TextWithTitle title="Type of Visit" content="Regular Checkup" />

            </div>

            <div className="grid grid-cols-2 gap-y-40 gap-x-40 pt-8">
                            <div>

                            <p className="text-2xl">Pick a date</p>
                            <Calendar highlightedDays={highlightedDays} chosenDate={chosenDate} onChosenDate={(value) => setChosenDate(value)} />

                            </div>

                            <div>
                           <p className="text-2xl">Available hours</p>
                           <div className="grid grid-cols-3 gap-y-5 gap-x-5 pt-4">
                           <Button color="blue outline big" label="9:00"/>
                           <Button color="blue outline big" label="10:00"/>
                           <Button color="blue outline big" label="11:00" />
                           <Button color="blue outline big" label="12:00" />

                            </div>
                            </div>

                  </div>

             <div className="grid grid-cols-2 gap-y-5 gap-x-20 pt-4">
                <Button color="pink big" label="Confirm"/>
                 <Button color="green outline xl" label="Cancel"/>


                </div>

         </PageContainer>
    );
}