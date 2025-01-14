import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PatientNavbar from "./PatientNavbar";
import DoctorNavbar from "./DoctorNavbar";
import AdminNavbar from "./AdminNavbar";
import DefaultNavbar from "./DefaultNavbar";

const NavLayout = ({children}) => {
    return <>
        {children}
        <Outlet />
    </>
};

export default function ProtectedRoutes({user, isHidden, onLogout, scenario}) {
    if (isHidden) return <NavLayout></NavLayout>;
    
    switch(user) {
        case "ROLE_PATIENT":
            return <NavLayout><PatientNavbar/></NavLayout>;
        case "ROLE_DOCTOR":
            return <NavLayout><DoctorNavbar scenario={scenario}/></NavLayout>;
        case "ROLE_ADMIN":
            return <NavLayout><AdminNavbar onLogout={onLogout} /></NavLayout>;
        default:
            return <NavLayout><DefaultNavbar/></NavLayout>
            // return <Navigate to="/login" replace/>;
        }
};