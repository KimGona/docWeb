import React, { useState, useEffect } from "react";
import PageContainer from "../components/PageContainer";
import SearchField from "../components/SearchField";
import Button from "../components/Button";
import RadioButtonDoctorList from "../components/RadioButton";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const emptyDoctor = {
  id: 0,
  name: "",
  surname: "",
  speciality: ""
}

function getSummaryDoctor(doctor) {
  if (doctor === undefined) return;
  else return <p className="text-black text-medium text-2xl">{doctor.name}</p>;
}

export default function AppointmentDoctors() {
  const { state } = useLocation();
  const { appointment } = state;

  const getInitialId = () => {
    if (typeof appointment.doctor !== "undefined" && appointment.doctor.id !== 0)
      return appointment.doctor.id;
    else if (doctors.length > 0)
      return doctors[0].id;
    else
      return emptyDoctor;
  };

  const [nameAndSurname, setNameAndSurname] = useState("");
  const [speciality, setSpeciality] = useState("");

  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if (nameAndSurname.length === 0 && speciality.length === 0) {
      getDoctors();
    } else {
      getDoctorsWithParams();
    }
    setIsShown(true);
  }, [isShown, nameAndSurname, speciality])

  const [doctors, setDoctors] = useState([{
    id: 0,
    name: "",
    surname: "",
    speciality: ""
  }]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(getInitialId())

  useEffect(() => {
    if (selectedDoctorId === 0) {
      setSelectedDoctorId(getInitialId());
    }
  }, [doctors])

  const onDoctorChosen = (event) => {
    console.log(event)
    setSelectedDoctorId(event)
  }

  let doctorChosen;
  if (doctors.length > 0)
    doctorChosen = doctors.find(elem => elem.id == selectedDoctorId);
  else
    doctorChosen = emptyDoctor;

  const navigate = useNavigate();

  const onNextClick = () => {
    let app = { ...appointment }
    app.doctor = doctorChosen
    navigate('/appointment_visit_types', {
      state: {
        appointment: app
      }
    });
    // navigate('/appointment_visit_types', { state: { doctor: doctorChosen } });
  };

  let getDoctors = async () => {
    try {
      let res = await fetch('http://localhost:8080/doctors', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        mode: 'cors',
        referrerPolicy: 'no-referrer',
        origin: "http://localhost:3000/",
      });

      if (res.status === 200) {
        console.log("get doctors succeeded");
        let list = await res.json();
        console.log(list);
        setDoctors(list);
      } else {
        console.log("get doctors failed");
      }
    } catch (error) {
      console.log(error);
    }
  }

  let getDoctorsWithParams = async () => {
    let words, nameR, surnameR;
    if (nameAndSurname.includes(" "))
      words = nameAndSurname.split(" ");
    else
      words = [nameAndSurname];

    if (words.length > 1)
      surnameR = words[1];
    else 
      surnameR = "";
    nameR = words[0];

    try {
      let path;
      if (speciality.length == 0) {
        path = "/name-surname?name=" + nameR + "&surname=" + surnameR;
      } else if (nameAndSurname.length == 0) {
        path = "/specialty?specialty=" + speciality;
      } else {
        path = "/all?name=" + nameR + "&surname=" + surnameR + "&specialty=" + speciality;
      }
      
      let res = await fetch('http://localhost:8080/doctors' + path, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        mode: 'cors',
        referrerPolicy: 'no-referrer',
        origin: "http://localhost:3000/",
      });

      if (res.status === 200) {
        console.log("get doctors succeeded");
        let list = await res.json();
        console.log(list);
        setDoctors(list);
      } else {
        console.log("get doctors failed");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <PageContainer title="Add appointment">
      {/* Summary bar */}
      <div className="fixed right-0 top-0 h-full w-[300px] bg-zinc-300 p-10">
        <div className="relative py-10 px-2">
          <p className="text-zinc-700 font-semibold text-3xl pb-10">Summary</p>
          <p className="text-zinc-700 text-thin text-xl">Chosen doctor</p>
          {getSummaryDoctor(doctorChosen)}
        </div>

        <div className="fixed right-20 bottom-10">
          <div className="relative">
            <Button color="pink big" label="Next" onClick={onNextClick} />
            <a className="pt-6 underline text-sm text-medium" href="/">Cancel</a>
          </div>
        </div>
      </div>

      {/* Screen Content */}
      <div className="pr-80 pt-10 w-full flex flex-col space-y-6">
        <p className="text-2xl font-medium">Find a doctor</p>
        <div className="flex flex-row space-x-10 items-center pb-10">
          <SearchField title="Name and surname" text={nameAndSurname} onTextChange={(e) => setNameAndSurname(e.target.value)}/>
          <div className="w-[150px]">
            <SearchField title="Speciality" text={speciality} onTextChange={(e) => setSpeciality(e.target.value)}/>
          </div>
        </div>
        <RadioButtonDoctorList list={doctors} chosenButtonId={selectedDoctorId} onButtonChosen={onDoctorChosen} />
      </div>
    </PageContainer>
  );
}