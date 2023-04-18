import React from "react";
import NavItemDiv from "../components/navigation_components/NavItemDiv";
import NavButton from "../components/navigation_components/NavButton";
import NavItemDocapp from "../components/navigation_components/NavItemDocapp";

const navRow = (
    <div className="flex items-baseline">
        <NavItemDiv path="/view_appointments" text="View all appointments" />
        <NavItemDiv path="/view_results" text="View health results" />
        <NavButton path="/add_appointment" text="Add appointment" />
        <NavItemDiv path="/account" text="Account" />
    </div>
);

export default function PatientNavbar({}) {
    return (
        <div className=" flex justify-between">
            <NavItemDocapp path="/" text="Docapp" />
            <div>{navRow}</div>
        </div>
    );
};