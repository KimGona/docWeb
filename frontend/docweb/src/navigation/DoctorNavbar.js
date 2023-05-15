import React from "react";
import NavItemDiv from "../components/navigation_components/NavItemDiv";
import NavItemDocapp from "../components/navigation_components/NavItemDocapp";

const navRow = (
    <div className="flex items-baseline">
        <NavItemDiv path="/write_results" text="Write health results" />
        <NavItemDiv path="/view_appointments" text="View appointments" />
        <NavItemDiv path="/view_results" text="View health results" />
        <NavItemDiv path="/check_off_time" text="Check-off time" />
        <NavItemDiv path="/account" text="Account" />
    </div>
);

export default function DoctorNavbar({}) {
    return (
        <div className="w-screen flex justify-between pr-4">
            <NavItemDocapp path="/" text="Docapp" />
            <div>{navRow}</div>
        </div>
    );
};