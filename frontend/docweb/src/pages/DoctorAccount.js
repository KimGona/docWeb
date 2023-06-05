import React, { useState, useEffect } from "react";
import PageContainer from "../components/PageContainer";
import TextWithTitle from "../components/TextWithTitle";
import WorkSchedule from "../components/WorkSchedule";
import VisitTypesGrid from "../components/VisitTypesGrid";
import VisitTypesDialog from "../components/dialogs/VisitTypesDialog";
import Button from "../components/Button";
import WorkScheduleDialog from "../components/dialogs/WorkScheduleDialog";

function VisitTypes({visitTypes, onClick}) {
    if (visitTypes.length <= 0)
        return <p className="text-zinc-500">Please input at least 1 visit type.</p>
    else 
        return <VisitTypesGrid visitTypes={visitTypes} onClick={onClick}/>
}

export default function DoctorAccount({userId, onLogout}) {
    const [addedVisitTypes, setAddedVisitTypes] = useState([]);
    const [allVisitTypes, setAllVisitTypes] = useState(["regular checkup", "blood tests", "allergy tests", "dentist consultation"]);

    const [openVisitTypes, setOpenVisitTypes] = useState(false)
    const handleOpenVisitTypes = (value) => setOpenVisitTypes(value);

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

    const [openWorkSchedule, setOpenWorkSchedule] = useState(false)
    const handleOpenWorkSchedules = (value) => setOpenWorkSchedule(value);

    const onConfirmVisitType = (newVisitTypes) => {
        setAddedVisitTypes(newVisitTypes);
    };

    const removeVisitType = (visitType) => {
        console.log("remove visit type")
        const newArr = [...addedVisitTypes]
        if (newArr.includes(visitType)) {
            const index = newArr.indexOf(visitType);
            newArr.splice(index, 1);
        }
        setAddedVisitTypes(newArr);
    }

    function getScheduleObj(s) {
        let start = 0;
        let end = 0;
        if (s.timeList.length > 1) {
            start = s.timeList[0];
            end = s.timeList[s.timeList.length - 1];
        }

        return {
            day: s.day,
            dayName: s.dayName,
            start: start,
            end: end,
        }
    }

    function getMappedSchedule(sch) {
        return sch.map(s => getScheduleObj(s));
    }

    const [isShown, setIsShown] = useState(false);

    useEffect(()=>{
        getSchedule();
        setIsShown(true);
    },[isShown])

    const getSchedule = async () => {
        try {
            let res = await fetch('http://localhost:8080/schedule-times/doctor/' + userId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                mode: 'cors',
                referrerPolicy: 'no-referrer',
                origin: "http://localhost:3000/",
            });
            console.log("res code: " + res.status.toString());

            if (res.status === 200) {
                console.log("success - addidng time schedule")
                console.log(await res.text())
                let obj = await res.json();
                console.log(obj)
                setSchedule(getMappedSchedule(obj));
            } else {
                console.log("adding time schedule failed")
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <PageContainer title="Your account details">
            <div className="absolute right-0 pr-10">
                <Button color="pink outline" label="Log out" onClick={onLogout}/>
            </div>
            <div className="grid grid-cols-2 gap-y-20 gap-x-40 pt-4">
                <div>
                <p className="text-2xl font-medium pb-4">Personal details</p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                    <TextWithTitle title="Name" content="Simon"/>
                    <TextWithTitle title="Surname" content="Mat" />
                    <TextWithTitle title="Username" content="Mat11" />
                    <div></div>

                    <TextWithTitle title="Gender" content="Male" />
                    <TextWithTitle title="Phone number" content="+48 123 456 789"/>
                    <TextWithTitle title="Specialty" content="Surgery" />
                </div>
                </div>

                <div>
                <div className="flex flex-row space-x-4 items-center pb-4">
                    <p className="text-2xl font-medium">Work schedule</p>
                    <Button color="green outline" label="Edit" onClick={() => handleOpenWorkSchedules(true)} />
                </div>
                <WorkSchedule schedule={schedule} />
                <WorkScheduleDialog 
                    open={openWorkSchedule}
                    schedule={schedule}
                    setIsShown={setIsShown}
                    onClose={() => handleOpenWorkSchedules(false)}
                    userId={userId}
                />
                </div>

                {/* Visit types */}
                <div className="space-y-6 col-span-2">
                    <div className="flex flex-row space-x-4 items-center">
                        <p className="text-2xl font-medium">Visit types</p>
                        <Button color="green outline" label="Edit" onClick={() => handleOpenVisitTypes(true)} />
                    </div>
                    <VisitTypes visitTypes={addedVisitTypes} onClick={(visitType) => removeVisitType(visitType)} />
                    <VisitTypesDialog 
                        title="hello" 
                        open={openVisitTypes} 
                        onClose={() => handleOpenVisitTypes(false)} 
                        onConfirm={(newVisitTypes) => onConfirmVisitType(newVisitTypes)} 
                        visitTypes={allVisitTypes} 
                        selected={addedVisitTypes}
                    />
                </div>
            </div>
        </PageContainer>
    );
}