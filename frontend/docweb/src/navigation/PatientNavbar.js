import React from "react";
import NavItemDiv from "../components/navigation_components/NavItemDiv";
import NavButton from "../components/navigation_components/NavButton";
import NavItemDocapp from "../components/navigation_components/NavItemDocapp";

const navRow = (
    <div className="flex items-baseline">
        <NavItemDiv path="/patient_all_appointments" text="View all appointments" />
        <NavItemDiv path="/patient_health_results" text="View health results" />
        <NavButton path="/patient_add_appointment" text="Add appointment" />
        <NavItemDiv path="/patient_account" text="Account" />
    </div>
);

export default function PatientNavbar({}) {
    return (
        <div className="w-screen flex justify-between">
            <NavItemDocapp path="/" text="Docapp" />
            <div>{navRow}</div>
        </div>
    );
};