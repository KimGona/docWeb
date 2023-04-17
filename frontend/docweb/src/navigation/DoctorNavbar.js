import React from "react";
import NavItemDiv from "../components/navigation_components/NavItemDiv";
import NavButton from "../components/navigation_components/NavButton";
import NavItemDocapp from "../components/navigation_components/NavItemDocapp";

const navRow = (
    <div className="flex items-baseline">
        <NavItemDiv path="/doctor_write_health_results" text="Write health results" />
        <NavItemDiv path="/doctor_view_appointments" text="View appointments" />
        <NavItemDiv path="/doctor_view_health_results" text="View health results" />
        <NavItemDiv path="/doctor_check_off_time" text="Check-off time" />
        <NavItemDiv path="/doctor_account" text="Account" />
    </div>
);

export default function DoctorNavbar({}) {
    return (
        <div className="w-screen flex justify-between">
            <NavItemDocapp path="/" text="Docapp" />
            <div>{navRow}</div>
        </div>
    );
};