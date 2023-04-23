import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PatientNavbar from "./PatientNavbar";
import DoctorNavbar from "./DoctorNavbar";
import AdminNavbar from "./AdminNavbar";

const NavLayout = ({children}) => {
    return <>
        {children}
        <Outlet />
    </>
};

export default function ProtectedRoutes({user}) {
    switch(user) {
        case "ROLE_PATIENT":
            return <NavLayout><PatientNavbar/></NavLayout>;
        case "ROLE_DOCTOR":
            return <NavLayout><DoctorNavbar/></NavLayout>;
        case "ROLE_ADMIN":
            return <NavLayout><AdminNavbar/></NavLayout>;
        default:
            return <Navigate to="/login" replace/>;
        }
};