import React, { useState } from "react";
import GreenBackground from "../resources/green-background.png";
import Button from "../components/Button";
import InputFieldWithTitle from "../components/InputFieldWithTitle";


import InputSchedule from "../components/InputSchedule";
import VisitTypesGrid from "../components/VisitTypesGrid";

import Calendar from "../components/Calendar";
import PageContainer from "../components/PageContainer";
import { useNavigate } from "react-router-dom";
import AppointmentWideResult from "../components/AppointmentWideResult";
import TextWithTitle from "../components/TextWithTitle";

import InputField from "../components/InputField";

export default function DoctorAddResult({}) {

 const onAddClick = () => {
        // TODO: send data
    };

    return (

        <div className="w-full flex flex-col items-start ">
            <img className="absolute object-contain" src={GreenBackground} />
             <div className="relative w-full h-screen flex justify-center align-middle items-center">
              <div className="relative px-12 py-12 bg-white flex flex-col justify-center items-start space-y-10">
            <p className="text-3xl font-bold">Add health result</p>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                    <TextWithTitle title="Patient's name" content="Allan"/>
                    <TextWithTitle title="Patient's surname" content="Matt" />
                    </div>
              <div className="grid grid-cols-2 gap-y-40 gap-x-40 pt-8">
                               <div className="justify-self-stretch space-y-3">
                                    <InputFieldWithTitle title="Blood sugar" />
                                     <InputFieldWithTitle title="Heart rate" />
                                      <InputFieldWithTitle title="Blood pressure" />
                                 </div>
                                   <div>
                                   <p>overall description</p>
                                   <InputField/>



                               </div>
                           </div>

                           <div className="pt-10">
                                           <Button color="pink big" label="Add health result" onClick={onAddClick}/>
                           </div>



            </div>
        </div>
        </div>

    );
}