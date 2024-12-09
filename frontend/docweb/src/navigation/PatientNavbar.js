import React from "react";
import NavItemDiv from "../components/navigation_components/NavItemDiv";
import NavItemDocapp from "../components/navigation_components/NavItemDocapp";
import { useNavigate } from "react-router-dom";
import NavItemButton from "../components/navigation_components/NavItemButton";

const NavRow = ({onAddAppointemnt}) => {
    return (
        <div className="flex items-baseline">
            <NavItemDiv path="/view_appointments" text="View all appointments" />
            <NavItemDiv path="/view_results" text="View health results" />
            <NavItemButton text="Add appointment" onClick={onAddAppointemnt}/>
            <NavItemDiv path="/account" text="Account" />
        </div>
    );
};

export default function PatientNavbar({}) {
    const navigate = useNavigate();
  
    const onAddNewAppointement = () => {
        let app = {
        "doctor": {
            "id": 0,
            "name": "",
            "surname": "",
            "specialty": "",
        },
        "visitType": {
            "id": 0,
            "name": "",
        },
        "date": "",
        "hour": 0,
        }
        navigate('/appointment_doctors', { state: { 
        appointment: app
        } });
        window.location.reload();
    };

    return (
        <div className="fixed top-0 z-10 bg-white w-screen h-20 flex justify-between pr-4">
            <NavItemDocapp path="/" text="Docapp" />
            <NavRow onAddAppointemnt={onAddNewAppointement} />
        </div>
    );
};