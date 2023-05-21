import React, { useState } from "react";
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import RadioButtonVisitTypeList from "../components/RadioButtonVisitTypeList";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function AppointmentVisitTypes() {
  const {state} = useLocation();
  const { appointment } = state;

  const getInitialId = () => {
    if (appointment.visitType.name !== "")
      return appointment.visitType.id;
    else return visitTypes[0].id;
  };

  const [visitTypes, setVisitTypes] = useState([
    {
      "id": 1,
      "name": "Regular checkup",
    },
    {
      "id": 2,
      "name": "Special surgery",
    },
    {
      "id": 3,
      "name": "Sudden appointment",
    },
  ]);
  const [selectedVisitTypeId, setVisitTypeId] = useState(getInitialId());

  const onVisitTypeChosen = (event) => {
    console.log(event)
    setVisitTypeId(event)
  }

  let visitTypeChosen = visitTypes.find( elem => elem.id == selectedVisitTypeId)

  const navigate = useNavigate();
  
  const onNextClick = () => {
    let app = {...appointment}
    app.visitType = visitTypeChosen
    navigate('/appointment_time', { state: { 
      appointment: app
    } });
  };

  const onReturnClick = () => {
    navigate(-1);
  };

    return (
        <PageContainer title="Add appointment">
          {/* Summary bar */}
          <div className="fixed right-0 top-0 h-full w-[300px] bg-zinc-300 p-10">
            <div className="relative py-10 px-2 flex flex-col gap-y-10">
              <p className="text-zinc-700 font-semibold text-3xl">Summary</p>
              <div>
                <p className="text-zinc-700 text-thin text-xl">Chosen doctor</p>
                <p className="text-black text-medium text-2xl">{appointment.doctor.name}</p>
              </div>
              
              <div>
                <p className="text-zinc-700 text-thin text-xl">Visit type</p>
                <p className="text-black text-medium text-2xl">{visitTypeChosen.name}</p>
              </div>
            </div>

            <div className="fixed right-20 bottom-10">
              <div className="relative">
                <div className="flex flex-col items-center gap-y-4">
                <Button color="green outline big" label="Return" onClick={onReturnClick}/>
                <Button color="pink big" label="Next" onClick={onNextClick}/>
                </div>
                <a className="pt-6 underline text-sm text-medium" href="/">Cancel</a>
              </div>
            </div>
        
          {/* Screen content */}
          </div>
          <div className="pr-80 pt-10 w-full flex flex-col space-y-6">
              <div className="w-full pb-10">
                <p className="text-2xl font-medium pb-6">Your specialist</p>
                <h1 className="text-4xl font-semibold">Dr {appointment.doctor.name}</h1>
                <p className="text-2xl font-normal text-zinc-700 pb-10">{appointment.doctor.specialty}</p>
                <hr className="border-1"></hr>
              </div>
            <RadioButtonVisitTypeList list={visitTypes} chosenButtonId={selectedVisitTypeId} onButtonChosen={onVisitTypeChosen}/>
          </div>
        </PageContainer>
      );
}