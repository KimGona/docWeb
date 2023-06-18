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
    const [doctor, setDoctor] = useState({
        name: "",
        surname: "",
        gender: "",
        phone: "",
        speciality: "",
        visitTypes: []
    });
    const [allVisitTypes, setAllVisitTypes] = useState([]);

    const [openVisitTypes, setOpenVisitTypes] = useState(false)
    const handleOpenVisitTypes = (value) => setOpenVisitTypes(value);

    const [schedule, setSchedule] = useState([])

    const [openWorkSchedule, setOpenWorkSchedule] = useState(false)
    const handleOpenWorkSchedules = (value) => setOpenWorkSchedule(value);

    const removeVisitType = async (visitType) => {
        try {
            let requestBody = JSON.stringify(visitType);

            let res = await fetch('http://localhost:8080/doctors/delete/visit-type', {
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
                console.log("success - delete visit type")
                console.log(await res.text())
                setIsShown(false);
            } else {
                console.log("delete visit type failed")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onConfirm = async (v) => {
        try {
            let requestBody = JSON.stringify(v);

            let res = await fetch('http://localhost:8080/doctors/visit-types', {
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
                console.log("success - addidng time schedule")
                console.log(await res.text())
                setIsShown(false);
            } else {
                console.log("adding time schedule failed")
            }
        } catch (error) {
            console.log(error);
        }

    }

    function getScheduleObj(s) {
        let start = 0;
        let end = 0;
        if (s.timeList.length > 1) {
            start = s.timeList[0].hour;
            end = s.timeList[s.timeList.length - 1].hour;
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
        getVisitTypes();
        getDoctor();
        setIsShown(true);
    },[isShown])

    const getDoctor = async () => {
        try {
            let res = await fetch('http://localhost:8080/doctors/id', {
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
                console.log("success - getDoctor")
                let obj = await res.json();
                console.log(obj)
                setDoctor(obj);
            } else {
                console.log("getDoctor failed")
            }
        } catch (error) {
            console.log(error);
        }
    }

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
          } else {
            console.log("get visit types failed");
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
                    <TextWithTitle title="Name" content={doctor.name}/>
                    <TextWithTitle title="Surname" content={doctor.surname} />
                    {/* <TextWithTitle title="Username" content="Mat11" /> */}
                    <div></div>

                    <TextWithTitle title="Gender" content={doctor.gender} />
                    <TextWithTitle title="Phone number" content={doctor.phone}/>
                    <TextWithTitle title="Specialty" content={doctor.speciality} />
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
                    <VisitTypes visitTypes={doctor.visitTypes} onClick={(visitType) => removeVisitType(visitType)} />
                    <VisitTypesDialog 
                        title="Change visit types" 
                        open={openVisitTypes} 
                        onClose={() => handleOpenVisitTypes(false)} 
                        onConfirm={(v) => onConfirm(v)}
                        setIsShown={setIsShown}
                        visitTypes={allVisitTypes} 
                        selected={doctor.visitTypes}
                    />
                </div>
            </div>
        </PageContainer>
    );
}