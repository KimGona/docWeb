import React, { useState, useEffect } from "react";
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import SummaryItem from "../components/SummaryItem";
import Calendar from "../components/Calendar";
import AvailableHours from "../components/AvailableHours";
import TranslateAlert from "../components/alerts/TranslateAlert";
import dayjs, { Dayjs } from 'dayjs';
import YesNoDialog from "../components/dialogs/YesNoDialog";

function getTimeDesc(hour) {
    if (hour < 12) return "am";
    else return "pm"
}

export default function PatientChangeAppointment() {
    const { state } = useLocation();
    const { appointment } = state;

    const navigate = useNavigate();

    const getInitialHour = () => {
        if (appointment.hour !== 0)
            return appointment.hour;
        else return hours[0];
    };

    const [result, setResult] = useState({
        value: "",  // 'success' or 'error'
        isVisible: false,
        message: "",
    });

    const onResultChange = (obj) => setResult(obj);
    const resetResult = () => {
        let obj = {
            value: "",
            isVisible: false,
            message: "",
        };
        onResultChange(obj);
    }

    function getResult(type, message) {
        let obj = {
            value: type,
            isVisible: true,
            message: message
        };
        return obj;
    }

    const setAlert = (type, isVisible, message) => {
        onResultChange(getResult(type, isVisible, message));
    }

    const [hours, setHours] = useState([]);
    const [selectedHour, setSelectedHour] = useState(getInitialHour());

    const [chosenDate, setChosenDate] = useState();
    const [highlightedDays, setHighlightedDays] = React.useState([]);

    const [isShown, setIsShown] = useState(false);

    useEffect(() => {
        getTimes();
        setIsShown(true);
    }, [isShown, chosenDate])


    const onHourChosen = (event) => {
        console.log(event)
        setSelectedHour(event)
    }

    const onReturn = () => {
        navigate(-1);
    };

    const onDateChosen = (event) => {
        let date = event.format('YYYY-MM-DD');
        console.log(date);
        setChosenDate(date)
    };

    const onConfirmChange = async () => {
        try {
            let app = { ...appointment }
            app.date = chosenDate
            app.hour = selectedHour

            let requestBody = JSON.stringify(app);

            let res = await fetch('http://localhost:8080/appointments', {
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
                navigate('/');
                window.location.reload();
            } else {
                console.log("appointment comfirmation failed")
                setAlert("error", "Could not confirm the appointment.");
            }
        } catch (error) {
            console.log(error);
            setAlert("error", "Could not confirm the appointment.")
        }
    }

    let getTimes = async () => {
        if (chosenDate === undefined) return;
        try {
            let res = await fetch('http://localhost:8080/schedule-times/doctor/' + appointment.doctor.id + '/date/' + chosenDate, {
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
                console.log("get times succeeded");
                let list = await res.json();
                console.log(list);
                setHours(list);
            } else {
                console.log("get times failed");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const [isShownMonth, setIsShownMonth] = useState(false);

    useEffect(() => {
        getAppointmentsForMonth();
        setIsShownMonth(true);
    }, [isShownMonth])

    let getAppointmentsForMonth = async () => {
        try {
            let res = await fetch('http://localhost:8080/appointments/doctor/current-month', {
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
                console.log("get appointments succeeded");
                let list = await res.json();
                console.log(list);
                let days = list.map(d => dayjs(d.date).date());
                console.log("days");
                console.log(days);
                setHighlightedDays([0].concat(days));
            } else {
                console.log("get appointments failed");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const [isDialogShown, setIsDialogShown] = useState(false);

    return (
        <PageContainer title="Add appointment">
            <div className="pr-[700px] w-full flex flex-col gap-x-10 justify-items-start">
                <YesNoDialog appointment={appointment} open={isDialogShown} onClose={() => setIsDialogShown(false)} />
                <TranslateAlert isVisible={result.isVisible} type={result.value} message={result.message} onClose={resetResult} />
                <SummaryItem
                    topText="Your specialist"
                    middleText={"Dr " + appointment.doctor.name + " " + appointment.doctor.surname}
                    bottomText={appointment.doctor.specialty}
                    isButtonVisible={false}
                />
                <SummaryItem
                    topText="Type of visit"
                    middleText={appointment.visitType.name}
                    isButtonVisible={false}
                />
                <div className="pt-10 w-full grid grid-cols-2 gap-x-10 justify-items-start">
                    <div>
                        <p className="text-2xl font-medium pb-10">Pick a date</p>
                        <div className="justify-self-center bg-greenLight border border-2 border-greenPrimary space-y-6">
                            <Calendar highlightedDays={highlightedDays} chosenDate={chosenDate} onChosenDate={onDateChosen} />
                        </div>
                    </div>
                    <div>
                        <p className="text-2xl font-medium pb-10">Available hours</p>
                        <AvailableHours hours={hours} selectedHour={selectedHour} setSelectedHour={onHourChosen} />
                    </div>
                </div>
                <div className="py-6 flex flex-row gap-x-6 align-center items-center">
                    <Button color="pink big" label="Confirm" onClick={onConfirmChange} />
                    <Button color="pink outline big" label="Cancel" onClick={onReturn} />
                </div>
            </div>
        </PageContainer>
    );
}