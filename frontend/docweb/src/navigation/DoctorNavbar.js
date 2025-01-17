import React from "react";
import NavItemDiv from "../components/navigation_components/NavItemDiv";
import NavItemDocapp from "../components/navigation_components/NavItemDocapp";

const navRow = (scenario) => {
    return (
    <div className="flex items-baseline">
        <NavItemDiv path="/write_results" text="Write health results" />
        <NavItemDiv path="/view_appointments" text="View appointments" />
        <NavItemDiv path="/view_results" text="View health results" />
        {scenario == "A" ? <NavItemDiv path="/check_schedule" text="Check schedule" /> : <NavItemDiv path="/check_off_time" text="Select time off" />}
        <NavItemDiv path="/account" text="Account" />
    </div>
    );
};

export default function DoctorNavbar({scenario}) {
    return (
        <div className="fixed top-0 z-10 bg-white h-20 w-screen flex justify-between pr-4">
            <NavItemDocapp path="/" text="Docapp" />
            <div>{navRow(scenario)}</div>
        </div>
    );
};