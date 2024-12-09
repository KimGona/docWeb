import React from "react";
import NavItemDiv from "../components/navigation_components/NavItemDiv";
import NavItemDocapp from "../components/navigation_components/NavItemDocapp";

const navRow = (
    <div className="flex items-baseline space-x-2">
        <NavItemDiv path="/sign_up" text="Sign up" />
        <NavItemDiv path="/login" text="Login" />
    </div>
);

export default function DefaultNavbar({}) {
    return (
        <div className="flex justify-between pb-2 pr-4">
            <NavItemDocapp path="/" text="Docapp" />
            <div>{navRow}</div>
        </div>
    );
};