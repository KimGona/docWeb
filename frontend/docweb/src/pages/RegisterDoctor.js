import React, { useState, useEffect } from "react";
import GreenBackground from "../resources/green-background.png";
import Button from "../components/Button";
import InputFieldWithTitle from "../components/InputFieldWithTitle";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import InputSchedule from "../components/InputSchedule";
import VisitTypesGrid from "../components/VisitTypesGrid";
import VisitTypesDialog from "../components/dialogs/VisitTypesDialog";
import TranslateAlert from "../components/alerts/TranslateAlert";
import RadioButtonGenderList from "../components/RadioButtonGender";

function VisitTypes({ visitTypes, onClick }) {
    if (visitTypes.length <= 0)
        return <p className="text-zinc-500">Please input at least 1 visit type.</p>
    else
        return <VisitTypesGrid visitTypes={visitTypes} onClick={onClick} />
}

export default function RegisterDoctor({ }) {
    const [allVisitTypes, setAllVisitTypes] = useState([]);

    const [open, setOpen] = useState(false)
    const handleOpen = (value) => setOpen(value);

    const [isShown, setIsShown] = useState(false);

    useEffect(() => {
        getVisitTypes();
        setIsShown(true);
    }, [isShown])

    const onConfirmVisitTypes = (newVisitTypes) => {
        console.log("onConfirmVisitTypes called")
        console.log(newVisitTypes)
        let newObject = { ...data };
        newObject.doctor.visitTypes = newVisitTypes;
        setData(newObject);
    };

    const removeItem = (visitType) => {
        console.log("remove visit type")
        const newArr = [...data.doctor.visitTypes]
        const descriptions = newArr.map(l => l.description)
        if (descriptions.includes(visitType)) {
            const index = descriptions.indexOf(visitType);
            newArr.splice(index, 1);
        }
        onConfirmVisitTypes(newArr);
    }

    const [confirmPassword, setConfirmPassword] = useState("");

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

    const [data, setData] = useState({
        username: "",
        password: "",
        role: "DOCTOR",
        doctor: {
            name: "",
            surname: "",
            speciality: "",
            phone: "",
            gender: "female",
            visitTypes: [],
        },
    });

    const resetData = () => {
        setData({
            username: "",
            password: "",
            role: "DOCTOR",
            doctor: {
                name: "",
                surname: "",
                speciality: "",
                phone: "",
                gender: "female",
                visitTypes: [],
            },
        });
        setConfirmPassword("");
    }

    function onDataChange(e, type) {
        let newObject = { ...data };
        newObject[type] = e.target.value;
        setData(newObject);
    }

    function onDoctorChange(e, type) {
        let newObject = { ...data };
        newObject["doctor"][type] = e.target.value;
        setData(newObject);
    }

    function onGenderChange(e) {
        console.log(e);
        let newObject = { ...data };
        newObject.doctor.gender = e;
        setData(newObject);
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

    const [schedule, setSchedule] = useState([
        {
            "day": 1,
            "dayName": "Monday",
            "start": "9",
            "end": "15",
        },
        {
            "day": 2,
            "dayName": "Tuesday",
            "start": "9",
            "end": "15",
        },
        {
            "day": 3,
            "dayName": "Wednesday",
            "start": "9",
            "end": "15",
        },
        {
            "day": 4,
            "dayName": "Thursday",
            "start": "9",
            "end": "15",
        },
        {
            "day": 5,
            "dayName": "Friday",
            "start": "9",
            "end": "15",
        },
    ])

    function getTimeList(start, end) {
        let list = [];
        let startTime = parseInt(start, 10);
        let endTime = parseInt(end, 10);
        for (let step = startTime; step <= endTime; step++) {
            list.push({
                hour: step,
            });
        }
        return list;
    }

    function getScheduleObj(s, doctorId) {
        return {
            day: s.day,
            dayName: s.dayName,
            timeList: getTimeList(s.start, s.end),
            doctor: {
                id: parseInt(doctorId, 10),
                name: "",
                surname: "",
                speciality: "",
                phone: "",
                gender: "",
                visitTypes: [],
            }
        }
    }

    function getScheduleTimeMapped(schedule, doctorId) {
        return schedule.map(s =>
            getScheduleObj(s, doctorId)
        );
    }

    const onSubmit = async (event) => {
        let user = await onCreateAccount(event);
        setScheduleTimesReq(user.doctor.id);
    }

    const setScheduleTimesReq = async (doctorId) => {
        try {
            let requestBody = JSON.stringify(getScheduleTimeMapped(schedule, doctorId));

            let res = await fetch('http://localhost:8080/schedule-times', {
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
            console.log("res code: " + res.status.toString());

            if (res.status === 200) {
                resetData()
                console.log("success - addidng time schedule")
                let obj = await res.json();
                console.log(obj);
                return obj;
            } else {
                console.log("adding time schedule failed")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onCreateAccount = async (event) => {
        event.preventDefault();
        resetResult();

        if (data.password != confirmPassword) {
            setAlert("error", "Passwords don't match.");
            return;
        } else if (data.password.length < 4) {
            setAlert("error", "Password should be at least 8 characters long.");
            return;
        }

        if (data.doctor.visitTypes.length < 1) {
            setAlert("error", "Please pick at least 1 visit type.");
            return;
        }

        try {
            let requestBody = JSON.stringify(data);

            let res = await fetch('http://localhost:8080/users/doctor', {
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
                console.log("success adding account");
                let obj = await res.json();
                console.log("obj");
                console.log(obj);
                resetData()
                setAlert("success", "Successfully created new account.");
                return obj;
            } else {
                console.log("create account failed")
                setAlert("error", "Could not create new account.");
            }
        } catch (error) {
            console.log(error);
            setAlert("error", "Could not create new account.");
        }
    }

    let getVisitTypes = async () => {
        try {
            let res = await fetch('http://localhost:8080/visit-types', {
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
                console.log("get visit types succeeded");
                let list = await res.json();
                console.log(list);
                setAllVisitTypes(list);
                setIsShown(true);
            } else {
                console.log("get visit types failed");
                setAlert("error", "Could not get visit types.");
            }
        } catch (error) {
            console.log(error);
            setAlert("error", "Could not get visit types.");
        }
    }

    const isPasswordError = data.password.length < 4;
    const isConfirmPasswordError = confirmPassword.length > 0 && confirmPassword !== data.password;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="w-full flex flex-col items-start ">
                <img className="absolute object-contain" src={GreenBackground} />
                <div className="relative w-full h-screen flex justify-center align-middle items-center">
                    <div className="flex flex-col justify-center items-center space-y-6">
                        <TranslateAlert isVisible={result.isVisible} type={result.value} message={result.message} onClose={resetResult} />
                        <div className="relative px-12 py-12 bg-white flex flex-col justify-center items-start space-y-10">
                            <p className="text-3xl font-bold text-greenPrimary">Register doctor</p>

                            {/* Row */}
                            <div className="flex flex-row space-x-6">

                                <div>
                                    <p className="text-xl font-medium pb-4">Personal details</p>
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 items-top">
                                        <InputFieldWithTitle title="Name" value={data.doctor.name} onValueChange={(e) => onDoctorChange(e, "name")} />
                                        <InputFieldWithTitle title="Surname" value={data.doctor.surname} onValueChange={(e) => onDoctorChange(e, "surname")} />
                                        <InputFieldWithTitle title="Specialization" value={data.doctor.speciality} onValueChange={(e) => onDoctorChange(e, "speciality")} />
                                        <InputFieldWithTitle title="Phone" value={data.doctor.phone} onValueChange={(e) => onDoctorChange(e, "phone")} />
                                        <div className="flex flex-row gap-x-4 items-center justify-center">
                                            <div className="grow">
                                                <p className="pb-2">Gender</p>
                                                <RadioButtonGenderList chosenValue={data.doctor.gender} onButtonChosen={(e) => onGenderChange(e)} />
                                            </div>
                                        </div>
                                        <div></div>
                                        <InputFieldWithTitle title="Username" value={data.username} onValueChange={(e) => onDataChange(e, "username")} />
                                        <div></div>
                                        <InputFieldWithTitle title="Password"
                                            type="password"
                                            isError={isPasswordError}
                                            errorMessage="Password should be at least 4 characters."
                                            value={data.password}
                                            onValueChange={(e) => onDataChange(e, "password")} />
                                        <InputFieldWithTitle title="Confirm password"
                                            type="password"
                                            isError={isConfirmPasswordError}
                                            errorMessage="Passwords don't match!"
                                            value={confirmPassword}
                                            onValueChange={(e) => setConfirmPassword(e.target.value)} />
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xl font-medium pb-4">Work schedule</p>
                                    <InputSchedule schedule={schedule} setSchedule={(v) => setSchedule(v)} />
                                </div>

                            </div>

                            {/* Visit types */}
                            <div className="space-y-6">
                                <p className="text-xl font-medium">Visit types</p>
                                <VisitTypes visitTypes={data.doctor.visitTypes.map(l => l.description)} onClick={(visitType) => removeItem(visitType)} />
                                <Button color="pink outline" label="+ Add visit type" onClick={() => handleOpen(true)} />
                                <VisitTypesDialog
                                    open={open}
                                    onClose={() => handleOpen(false)}
                                    onConfirm={(newVisitTypes) => onConfirmVisitTypes(newVisitTypes)}
                                    visitTypes={allVisitTypes}
                                    selected={data.doctor.visitTypes} />
                            </div>

                            <Button color="pink xl" label="Create account" onClick={onSubmit} />
                        </div>
                    </div>
                </div>
            </div>
        </LocalizationProvider>
    );
}