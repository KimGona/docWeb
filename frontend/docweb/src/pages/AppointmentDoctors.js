import React, { useState } from "react";
import PageContainer from "../components/PageContainer";
import SearchField from "../components/SearchField";
import Button from "../components/Button";
import RadioButtonDoctorList from "../components/RadioButton";
import { useNavigate } from "react-router-dom";

export default function AppointmentDoctors() {
  const [doctors, setDoctors] = useState([
    {
      "id": 1,
      "name": "Ellen",
      "specialty": "Neuroseurgon"
    },
    {
      "id": 2,
      "name": "Hellen",
      "specialty": "Neuroseurgon"
    },
    {
      "id": 3,
      "name": "Melon",
      "specialty": "Neuroseurgon"
    },
  ]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(doctors[0].id)

  const onDoctorChosen = (event) => {
    console.log(event)
    setSelectedDoctorId(event)
  }

  let doctorChosen = doctors.find( elem => elem.id == selectedDoctorId)

  const navigate = useNavigate();
  
  const onNextClick = () => {
    navigate('/appointment_visit_types', { state: { doctor: doctorChosen } });
  };

    return (
        <PageContainer title="Add appointment">
          {/* Summary bar */}
          <div className="fixed right-0 top-0 h-full w-[300px] bg-zinc-300 p-10">
            <div className="relative py-10 px-2">
              <p className="text-zinc-700 font-semibold text-3xl pb-10">Summary</p>
              <p className="text-zinc-700 text-thin text-xl">Chosen doctor</p>
              <p className="text-black text-medium text-2xl">{doctorChosen.name}</p>
            </div>

            <div className="fixed right-20 bottom-10">
              <div className="relative">
                <Button color="pink big" label="Next" onClick={onNextClick}/>
                <a className="pt-6 underline text-sm text-medium" href="/">Cancel</a>
              </div>
            </div> 
          </div>

          {/* Screen Content */}
          <div className="pr-80 pt-10 w-full flex flex-col space-y-6">
            <p className="text-2xl font-medium">Find a doctor</p>
            <div className="flex flex-row space-x-10 items-center pb-10">
              <SearchField />
              <Button color="green" label="Search" />
            </div>
            <RadioButtonDoctorList list={doctors} chosenButtonId={selectedDoctorId} onButtonChosen={onDoctorChosen}/>
          </div>
        </PageContainer>
      );
}