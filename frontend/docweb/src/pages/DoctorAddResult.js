import React, { useState } from "react";
import GreenBackground from "../resources/green-background.png";
import Button from "../components/Button";
import InputFieldWithTitle from "../components/InputFieldWithTitle";
import TextWithTitle from "../components/TextWithTitle";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function DoctorAddResult({ }) {
    
    const {state} = useLocation();
    const { appointment } = state;

    const navigate = useNavigate();

    const [data, setData] = useState({
        appointmentId: 1,
        bloodSugar: 0,
        heartRate: 0,
        bloodPressure: 0,
        description: ""
    })

    const onAddClick = () => {
        // TODO: send data
        navigate(-1);
    };

    const onDataChange = (e, type) => {
        let newData = {...data}
        let value = parseInt(e.target.value, 10);
        switch (type) {
            case 0: 
                newData.bloodSugar = value;
                break;
            case 1: 
                newData.heartRate = value;
                break;
            case 2: 
                newData.bloodPressure = value;
                break;
        }
        setData(newData);
    }

    const onDescriptionChange = (e) => {
        let newData = {...data}
        newData.description = e.target.value
        setData(newData);
    }

    return (

        <div className="w-full flex flex-col items-start ">
            <img className="absolute object-contain" src={GreenBackground} />
            <div className="relative w-full h-screen flex justify-center align-middle items-center">
                <div className="relative px-12 py-12 bg-white flex flex-col justify-center items-start space-y-10">
                    <p className="text-3xl font-bold">Add health result</p>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                        <TextWithTitle title="Patient's name" content="Allan" />
                        <TextWithTitle title="Patient's surname" content="Matt" />
                    </div>
                    <div className="grid grid-cols-3 gap-y-40 gap-x-40 pt-8">
                        <div className="justify-self-stretch space-y-3">
                            <InputFieldWithTitle value={data.bloodSugar} onValueChange={(e) => onDataChange(e, 0)} title="Blood sugar" />
                            <InputFieldWithTitle value={data.heartRate} onValueChange={(e) => onDataChange(e, 1)} title="Heart rate" />
                            <InputFieldWithTitle value={data.bloodPressure} onValueChange={(e) => onDataChange(e, 2)} title="Blood pressure" />
                        </div>
                        <div className="col-span-2">
                            <p>Overall description</p>
                            <div>
                                <textarea
                                id="textarea1"
                                value={data.description}
                                onChange={onDescriptionChange}
                                placeholder="Enter description..."
                                className="border border-2 border-zinc-400 focus:outline-pink-500 rounded-md w-full object-contain py-2 px-4"
                                required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="pt-10">
                        <Button color="pink big" label="Add health result" onClick={onAddClick} />
                    </div>
                </div>
            </div>
        </div>
    );
}