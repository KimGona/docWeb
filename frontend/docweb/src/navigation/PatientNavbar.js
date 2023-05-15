import React from "react";
import NavItemDiv from "../components/navigation_components/NavItemDiv";
import NavItemDocapp from "../components/navigation_components/NavItemDocapp";

const navRow = (
    <div className="flex items-baseline">
        <NavItemDiv path="/view_appointments" text="View all appointments" />
        <NavItemDiv path="/view_results" text="View health results" />
        <NavItemDiv path="/appointment_doctors" text="Add appointment" />
        <NavItemDiv path="/account" text="Account" />
    </div>
);

export default function PatientNavbar({}) {
    return (
        <div className=" flex justify-between pr-4">
            <NavItemDocapp path="/" text="Docapp" />
            <div>{navRow}</div>
        </div>
    );
};