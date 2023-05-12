import React, { useState } from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";
import PageContainer from "../components/PageContainer";
import Appointment from "../components/Appointment";
import AppointmentDark from "../components/AppointmentDark";
import WeekInput from "../components/WeekInput";
import AccountDetail from "../components/AccountDetail";
import ClosableHealthResult from "../components/ClosableHealthResult"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import RadioButtonList from "../components/RadioButton";


export default function PatientDashboard({}) {
    const [doctorList, setDoctorList] = useState(
      [
        {
          "id": 1,
          "name": "Dr Andy"
        },
        {
          "id": 2,
          "name": "Dr Bruck"
        },
        {
          "id": 3,
          "name": "Dr Mellon"
        },
      ]
    );

    const [chosenDoctorId, setChosenDoctorId] = useState(1);

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <PageContainer title="All appointments">
          <div className="mb-4 flex flex-col space-y-5">
          <p>test</p>
            <Button label="Button"></Button>
            <Button label="Button" color="pink outline"></Button>
            <Button label="Button" color="green outline"></Button>
            <Button label="Button" color="pink big"></Button>
              <Appointment isDark={true} isDoctor={false} date={"18.03.2020"} hour={"8:00"} personName={"Doctor Mary Wilson"} visitType="Regular checkup"></Appointment>
              <AppointmentDark date={"18.03.2020"} hour={"8:00"} personName={"Doctor Mary Wilson"} visitType="Regular checkup"></AppointmentDark>
              <WeekInput></WeekInput>
            <InputField>Input</InputField>
            <AccountDetail name={"Alan"} surName={"Walker"} userName={"Alan234"} gender={"Male"} phoneNumber={"+48 123 456 789"} specialty={"neurologist"}></AccountDetail>
            <ClosableHealthResult num={1} date={"10.03.2022"} patientName={"Walker"} bloodSugar={123} heartRate={98} bloodPressure={71}
            description={"Lorem Ipsum is simply dummy text of the printing and typesettin industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially."}></ClosableHealthResult>
            <DatePicker
              label="Date picker"
              // value={value}
              // onChange={(newValue) => setValue(newValue)}
            />
            <RadioButtonList list={doctorList} chosenButtonId={chosenDoctorId} onButtonChosen={(id) => setChosenDoctorId(id)}/>
          </div>
        </PageContainer>
      </LocalizationProvider>
    );
}