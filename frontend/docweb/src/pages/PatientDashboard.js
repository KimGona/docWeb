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
import AppointmentWide from "../components/AppointmentWide";
import CalendarWithVisits from "../components/CalendarWithVisits";
import CalendarForPatient from "../components/CalendarForPatient"
import SimpleDialog from "../components/dialogs/SimpleDialog";

import VisitTypesGrid from "../components/VisitTypesGrid";
import VisitTypesDialog from "../components/dialogs/VisitTypesDialog";
import InputFieldWithTitle from "../components/InputFieldWithTitle";
import InputSchedule from "../components/InputSchedule";



function VisitTypes({visitTypes, onClick}) {
    if (visitTypes.length <= 0)
        return <p className="text-zinc-500">Please input at least 1 visitType.</p>
    else
        return <VisitTypesGrid visitTypes={visitTypes} onClick={onClick}/>
}


export default function PatientDashboard({}) {
      const [appointments, setAppointments] = useState([{
        date: "10.04.23",
        hour: "9:00",
        name: "Dr ",
        surname: "Mary Witherson",
        visitType: "Regular check up"
      },
      {
        date: "20.04.23",
        hour: "10:00",
        name: "Dr",
        surname: "Mary Witherson",
        visitType: "Regular check up"
      }]);
      const [chosenDate, setChosenDate] = useState();
      const [highlightedDays, setHighlightedDays] = React.useState([0, 2, 4, 15, 16, 17]);  // first number not rendered, put always first as 0

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
        <PageContainer title="Upcoming appointments">
                 <div className="w-full pt-10 grid grid-cols-2 place-start justify-items-start">
                    <div className="justify-self-stretch space-y-8">
                      {
                        appointments.map( appointment =>
                          <AppointmentWide date={appointment.date} hour={appointment.hour} name={appointment.name + " " + appointment.surname} visitType={appointment.visitType} />
                        )
                      }
                      <div className="space-y-6">
                        <VisitTypes visitTypes={addedVisitTypes} onClick={(visitType) => removeItem(visitType)} />
                        <Button color="pink outline" label="+Add new appointment" onClick={() => handleOpen(true)} />
                        <VisitTypesDialog title="hello" open={open} onClose={() => handleOpen(false)} onConfirm={(newVisitTypes) => onConfirm(newVisitTypes)} visitTypes={allVisitTypes} />
                      </div>
                    </div>
                      <div className="justify-self-center">
                          <CalendarForPatient highlightedDays={highlightedDays} chosenDate={chosenDate} onChosenDate={(value) => setChosenDate(value)} />
                      </div>
                 </div>
                 <p className="text-3xl font-bold">Your health</p>
        </PageContainer>


    );
}