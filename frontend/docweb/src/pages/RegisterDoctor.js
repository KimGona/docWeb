import React, { useState } from "react";
import GreenBackground from "../resources/green-background.png";
import Button from "../components/Button";
import InputFieldWithTitle from "../components/InputFieldWithTitle";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import InputSchedule from "../components/InputSchedule";
import VisitTypesGrid from "../components/VisitTypesGrid";
import VisitTypesDialog from "../components/dialogs/VisitTypesDialog";

function VisitTypes({visitTypes, onClick}) {
    if (visitTypes.length <= 0)
        return <p className="text-zinc-500">Please input at least 1 visit type.</p>
    else 
        return <VisitTypesGrid visitTypes={visitTypes} onClick={onClick}/>
}


export default function RegisterDoctor({}) {
    const [addedVisitTypes, setAddedVisitTypes] = useState([]);
    const [allVisitTypes, setAllVisitTypes] = useState(["regular checkup", "blood tests", "allergy tests", "dentist consultation"]);

    const [open, setOpen] = useState(false)
    const handleOpen = (value) => setOpen(value);

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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="w-full flex flex-col items-start ">
            <img className="absolute object-contain" src={GreenBackground} />
            <div className="relative w-full h-screen flex justify-center align-middle items-center">
                <div className="relative px-12 py-12 bg-white flex flex-col justify-center items-start space-y-10">
                    <p className="text-3xl font-bold text-greenPrimary">Register doctor</p>

                    {/* Row */}
                    <div className="flex flex-row space-x-6">
                    
                    <div>
                        <p className="text-xl font-medium pb-4">Personal details</p>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4 items-top">
                            <InputFieldWithTitle title="Name" />
                            <InputFieldWithTitle title="Surname" />
                            <div className="flex flex-row gap-x-4 items-center justify-center">
                                {/* TODO: as date picker */}
                                <div>
                                    <p className="pb-2">Birth date</p>
                                    <DatePicker
                                        label="Date picker"
                                        // value={value}
                                        // onChange={(newValue) => setValue(newValue)}
                                    />
                                </div>
                                {/* TODO: as Dropdown */}
                                <InputFieldWithTitle title="Gender" width="w-[50px]" />

                            </div>
                            <InputFieldWithTitle title="Address" />
                            <InputFieldWithTitle title="Username" />
                            <div></div>
                            <InputFieldWithTitle title="Password" isError={true} />
                            <InputFieldWithTitle title="Confirm password" isError={true} errorMessage="Passwords don't match!" />
                        </div>
                    </div>

                    <div>
                        <p className="text-xl font-medium pb-4">Work schedule</p>
                        <InputSchedule />
                    </div>

                    </div>
                    
                    {/* Visit types */}
                    <div className="space-y-6">
                        <p className="text-xl font-medium">Visit types</p>
                        <VisitTypes visitTypes={addedVisitTypes} onClick={(visitType) => removeItem(visitType)} />
                        <Button color="pink outline" label="+ Add visit type" onClick={() => handleOpen(true)} />
                        <VisitTypesDialog title="hello" open={open} onClose={() => handleOpen(false)} onConfirm={(newVisitTypes) => onConfirm(newVisitTypes)} visitTypes={allVisitTypes} />
                    </div>
        
                    <Button color="pink xl" label="Create account" />
                </div>
            </div>
        </div>
        </LocalizationProvider>
    );
}