import React,{useState} from "react";
import PageContainer from "../components/PageContainer";
import Calendar from "../components/Calendar";
import AppointmentWide from "../components/AppointmentWide";

export default function PatientAppointments() {
    const [appointments, setAppointments] = useState([{
        date: "10.04.23",
        hour: "9:00",
        name: "Dr Mary Witherson",
        visitType: "Regular checkup"
      },
      {
         date: "20.04.23",
         hour: "10:00",
         name: "Dr Mary Witherson",
         visitType: "Regular checkup"
      },
      {
        date: "30.04.23",
        hour: "9:30",
        name: "Dr Mary Witherson",
        visitType: "Regular checkup"
      }]);
      const [chosenDate, setChosenDate] = useState();
      const [highlightedDays, setHighlightedDays] = React.useState([0, 2, 4, 15, 16, 17]);

    return (
        <PageContainer title="Patient's all appointments">
        <div className="w-full pt-10 grid grid-cols-2 place-start justify-items-start">
                <div className="justify-self-stretch space-y-8">
                  {
                    appointments.map( appointment =>
                      <AppointmentWide date={appointment.date} hour={appointment.hour} name={appointment.name} visitType={appointment.visitType} />
                    )
                  }
                </div>
              </div>
        </PageContainer>
      );
}