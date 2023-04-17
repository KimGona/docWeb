import React from "react";
import NavItemDiv from "../components/navigation_components/NavItemDiv";
import NavItemDocapp from "../components/navigation_components/NavItemDocapp";

const navRow = (
    <div className="flex items-baseline">
        <NavItemDiv path="/admin_register_admin" text="Register admin" />
        <NavItemDiv path="/doctor_register_doctor" text="Register doctor" />
        <NavItemDiv path="/log_out" text="Log out" />
    </div>
);

export default function AdminNavbar({}) {
    return (
        <div className="w-screen flex justify-between">
            <NavItemDocapp path="/" text="Docapp" />
            <div>{navRow}</div>
        </div>
    );
};