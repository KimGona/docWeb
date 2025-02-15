import React from "react";
import NavItemDiv from "../components/navigation_components/NavItemDiv";
import NavItemDocapp from "../components/navigation_components/NavItemDocapp";
import NavItemButton from "../components/navigation_components/NavItemButton";

function NavRow({onLogout}) {
    return (
        <div className="flex items-baseline">
            <NavItemDiv path="/register_admin" text="Register admin" />
            <NavItemDiv path="/register_doctor" text="Register doctor" />
            <NavItemDiv path="/add_visit_types" text="Add visit types" />
            <NavItemButton text="Log out" onClick={onLogout} />
        </div>
    );
}

export default function AdminNavbar({ onLogout }) {
    return (
        <div className="fixed top-0 z-10 bg-white h-20 w-screen flex justify-between pr-4">
            <NavItemDocapp path="/" text="Docapp" />
            <NavRow onLogout={onLogout} />
        </div>
    );
};