import React, { useState } from "react";
import PageContainer from "../components/PageContainer";
import SearchField from "../components/SearchField";
import Button from "../components/Button";
import RadioButtonVisitTypeList from "../components/RadioButtonVisitTypeList";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function AppointmentVisitTypes() {
  const {state} = useLocation();
  const { doctor } = state;

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
  const [selectedVisitTypeId, setVisitTypeId] = useState(visitTypes[0].id)

  const onVisitTypeChosen = (event) => {
    console.log(event)
    setVisitTypeId(event)
  }

  let visitTypeChosen = visitTypes.find( elem => elem.id == selectedVisitTypeId)

  const navigate = useNavigate();
  
  const onNextClick = () => {
    navigate('/appointment_time', { state: { 
        doctor: doctor,
        visitType: visitTypeChosen
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
                <p className="text-black text-medium text-2xl">{doctor.name}</p>
              </div>
              
              <div>
                <p className="text-zinc-700 text-thin text-xl">Chosen doctor</p>
                <p className="text-black text-medium text-2xl">{visitTypeChosen.name}</p>
              </div>
            </div>

            <div className="fixed right-20 bottom-10">
              <div className="relative">
                {/* for later screens */}
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
            <p className="text-2xl font-medium">Find a doctor</p>
            <div className="flex flex-row space-x-10 items-center pb-10">
              <SearchField />
              <Button color="green" label="Search" />
            </div>
            <RadioButtonVisitTypeList list={visitTypes} chosenButtonId={selectedVisitTypeId} onButtonChosen={onVisitTypeChosen}/>
          </div>
        </PageContainer>
      );
}