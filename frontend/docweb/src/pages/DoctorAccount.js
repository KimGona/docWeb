import React, { useState } from "react";
//import GreenBackground from "../resources/green-background.png";
import Button from "../components/Button";
import TextWithTitle from "../components/TextWithTitle";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';

import VisitTypesGrid from "../components/VisitTypesGrid";
import VisitTypesDialog from "../components/dialogs/VisitTypesDialog";
import ScheduleDialog from "../components/dialogs/ScheduleDialog";


function VisitTypes({visitTypes, onClick}) {
    if (visitTypes.length <= 0)
        return <p className="text-zinc-500">Please add at least 1 visit type.</p>
    else
        return <VisitTypesGrid visitTypes={visitTypes} onClick={onClick}/>
}

function EditSchedule({schedule, onClick}){
    return
}


export default function DoctorAccount({}) {
   const [addedVisitTypes, setAddedVisitTypes] = useState([]);
       const [allVisitTypes, setAllVisitTypes] = useState(["regular checkup", "blood tests", "allergy tests", "dentist consultation"]);

       const [open, setOpen] = useState(false)
       const [openSchedule, setOpenSchedule] = useState(false);
       const handleOpen = (value) => setOpen(value);
       const handleOpenSchedule = (value) => setOpenSchedule(value);


       const onConfirm = (newVisitTypes) => {
           const set = new Set(addedVisitTypes);
           const extendedSet = new Set([ ...set, ...newVisitTypes ]);
           console.log("on confirm new array");
           console.log([...extendedSet]);
           setAddedVisitTypes([...extendedSet]);
       };

       const removeItem = (visitType) => {
           console.log("remove visit type")
           const newArr = [...addedVisitTypes]
           if (newArr.includes(visitType)) {
               const index = newArr.indexOf(visitType);
               newArr.splice(index, 1);
           }
           setAddedVisitTypes(newArr);
       }



       return (

           <div className="w-full pt-10 flex-col items-start ">

               <div className="relative w-full h-screen flex justify-center align-middle items-center">
                   <div className="relative px-12 py-12 bg-white flex flex-col justify-center items-start space-y-10">
                       <p className="text-3xl font-bold text-greenPrimary">Your Account Details</p>

                       {/* Row */}
                       <div className="flex flex-row space-x-6">

                       <div>
                           <p className="text-xl font-medium pb-4">Personal details</p>
                           <div className="grid grid-cols-2 gap-x-8 gap-y-4 items-top">
                               <TextWithTitle title="Name" content="Simon"/>
                               <TextWithTitle title="Surname" content="Mat" />
                               <TextWithTitle title="Username" content="Mat11" />
                               <div></div>

                               <TextWithTitle title="Gender" content="Male" />
                               <TextWithTitle title="Phone number" content="+48 123 456 789"/>
                               <TextWithTitle title="Specialty" content="Surgery" />
                           </div>
                       </div>


                       <div>
                           <p className="text-xl font-medium pb-4">Work schedule</p>
                           <ShowSchedule />
                          /*Want to make pop up when I click "Edit Schedule" but not it doesn't work*/
                           <Button color="pink outline" label="Edit Schedule" onClick={() => handleOpenSchedule(true)} />
                           <ScheduleDialog title="hi" open={open} onClose={() => handleOpenSchedule(false)} onConfirm={true}/>
                       </div>

                       </div>

                       {/* Visit types */}
                       <div className="space-y-6">
                           <p className="text-xl font-medium">Visit types</p>
                           <VisitTypes visitTypes={addedVisitTypes} onClick={(visitType) => removeItem(visitType)} />
                           <Button color="pink outline" label="Edit Visit Type" onClick={() => handleOpen(true)} />
                           <VisitTypesDialog title="hello" open={open} onClose={() => handleOpen(false)} onConfirm={(newVisitTypes) => onConfirm(newVisitTypes)} visitTypes={allVisitTypes} />
                       </div>

                       <Button color="pink xl" label="Confirm account" />
                   </div>
               </div>
           </div>

           );
}


function ShowScheduleItem({day,start,end}) {
    return (
        <>
            <p className="font-medium">{day}</p>
            <p type="number" width="w-[70px]">{start}</p>
            <p type="number" width="w-[70px]">{end} </p>
        </>
    );
};

function ShowScheduleTitle({text}) {
    return (
        <p className="text-sm text-gray-400">{text}</p>
    );
};

function ShowSchedule({}) {
    return (
        <div className="grid grid-cols-3 gap-4 items-center">
            <ShowScheduleTitle text="Day" />
            <ShowScheduleTitle text="Start time" />
            <ShowScheduleTitle text="End time" />

            <ShowScheduleItem day="Monday" start="9" end="18"/>
            <ShowScheduleItem day="Tuesday" start="9" end="18"/>
            <ShowScheduleItem day="Wednesday" start="9" end="18"/>
            <ShowScheduleItem day="Thursday" start="9" end="18"/>
            <ShowScheduleItem day="Friday" start="9" end="18"/>

        </div>
    );
};
