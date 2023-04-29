import React from "react";
import NavItemDiv from "../components/navigation_components/NavItemDiv";
import NavButton from "../components/navigation_components/NavButton";
import NavItemDocapp from "../components/navigation_components/NavItemDocapp";

const navRow = (
    <div className="flex items-baseline">
        <NavButton path="/sign_up" text="Sign up" />
        <NavItemDiv path="/login" text="Login" />
    </div>
);

export default function DefaultNavbar({}) {
    return (
        <div className=" flex justify-between">
            <NavItemDocapp path="/" text="Docapp" />
            <div>{navRow}</div>
        </div>
    );
};