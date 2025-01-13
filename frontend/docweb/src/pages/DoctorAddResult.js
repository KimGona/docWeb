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

    const [isEditing, setIsEditing] = useState(true);
    const [data, setData] = useState({
        appointment: appointment,
        bloodSugar: 0,
        heartRate: 0,
        bloodPressure: 0,
        description: ""
    })

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
                newData.bloodPressure = e.target.value;
                break;
        }
        setData(newData);
    }

    const onDescriptionChange = (e) => {
        let newData = {...data}
        newData.description = e.target.value
        setData(newData);
    }

    const onConfirm = async (event) => {
        event.preventDefault();
    
        try {
          let requestBody = JSON.stringify(data);
    
          let res = await fetch('http://localhost:8080/health-results', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: requestBody,
            credentials: 'include',
            mode: 'cors',
            referrerPolicy: 'no-referrer',
            origin: "http://localhost:3000/",
    
          });
    
          if (res.status === 200) {
            setIsEditing(false);
          } else {
            console.log("health result confirmation failed")
          }
        } catch (error) {
          console.log(error);
        }
      }

    
    const onShowAll = () => {
        navigate("/view_results");
    }

      
    const onAddNext = () => {
        navigate("/write_results");
    }

    return (

        <div className="w-full flex flex-col items-start ">
            <img className="absolute object-contain" src={GreenBackground} />
            {isEditing ? 
                <EditScreen appointment={appointment} data={data} onConfirm={onConfirm} onDataChange={onDataChange} onDescriptionChange={onDescriptionChange} />
                : <SuccessScreen onShowAll={onShowAll} onAddNext={onAddNext} />}
        </div>
    );
}


function EditScreen({appointment, data, onConfirm, onDataChange, onDescriptionChange}) {
    return (
        <div className="relative w-full h-screen flex justify-center align-middle items-center px-20 pt-20">
                <div className="relative px-12 py-12 bg-white flex flex-col justify-center items-start space-y-4">
                    <div className="space-y-4">
                    <p className="text-3xl font-bold">Add health result</p>
                    <p className="text-lg font-normal text-gray-500">Enter the required data and confirm the health results of your patient.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                        <TextWithTitle title="Patient's name:" content={`${appointment.patient.name} ${appointment.patient.surname}`} />
                    </div>
                    <div className="grid grid-cols-3 gap-y-40 gap-x-20 pt-8">
                        <div className="justify-self-stretch space-y-3">
                            <InputFieldWithTitle value={data.bloodSugar} onValueChange={(e) => onDataChange(e, 0)} title="Blood sugar" description="Enter the value in mg/dL." type="number" />
                            <InputFieldWithTitle value={data.heartRate} onValueChange={(e) => onDataChange(e, 1)} title="Heart rate" description="Enter the value of beats per minute." type="number" />
                            <InputFieldWithTitle value={data.bloodPressure} onValueChange={(e) => onDataChange(e, 2)} title="Blood pressure" description="Enter the systolic and diastolic values of the blood pressure, e.g.: 120/80." type="text" pattern="\d{2}/\d{3}"/>
                        </div>
                        <div className="col-span-2 px-20 space-y-4">
                            <div>
                            <p className="text-lg font-semibold">Additional notes</p>
                            <p className="text-md font-normal text-gray-500">Enter any additional information about the patient of the appointment. Enter the diagnosis for the patient and the further steps he/she should take.</p>
                            </div>
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
                        <Button color="pink big" label="Add health result" onClick={onConfirm} />
                    </div>
                </div>
            </div>
    );
}

function SuccessScreen({onShowAll, onAddNext}) {
    return (
        <div className="relative w-full h-screen flex flex-col justify-center align-middle items-center gap-4">
            <div className="py-40 px-80 bg-white flex flex-col justify-center align-middle items-center gap-4">
            <p className="text-3xl font-bold">Health result added!</p>
            <p className="text-lg font-normal">View all added health results</p>
            <button className="bg-violet-500 whitespace-nowrap text-white font-semibold py-2 px-4 rounded hover:bg-violet-600" onClick={onShowAll}>
              Show all added
            </button>
            
            <hr className="w-[10vw] border-t border-gray-300 my-4" />
            <p className="text-lg font-normal">or</p>
            <p className="text-lg font-normal">Add next health result</p>
            <button className="bg-white border-violet-500 border-4 whitespace-nowrap text-black font-semibold py-2 px-4 rounded hover:bg-violet-200"  onClick={onAddNext}>
              Add next
            </button>
            </div>
        </div>
    );
}