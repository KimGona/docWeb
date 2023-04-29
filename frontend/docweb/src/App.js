import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, redirect, Navigate } from 'react-router-dom';
import PatientDashboard from './pages/PatientDashboard';
import ProtectedRoutes from './navigation/ProtectedRoutes';
import DoctorDashboard from './pages/DoctorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PatientAppointments from './pages/PatientAppointments';
import DoctorAppointments from './pages/DoctorAppointments';
import JoinUs from './pages/JoinUs';
import Login from './pages/Login';
import Signup from './pages/Signup';

function getScreen (user, patientScreen, doctorScreen, adminScreen){
  switch(user) {
    case "ROLE_PATIENT":
      return patientScreen;
    case "ROLE_DOCTOR":
        return doctorScreen;
    case "ROLE_ADMIN":
        return adminScreen;
    default:
        return <Navigate to="/join_us" replace/>;
  }
}

function getLoggedOutScreen (user, screen){
  switch(user) {
    case "ROLE_PATIENT", "ROLE_DOCTOR", "ROLE_ADMIN":
      <Navigate to="/" replace/>;
    default:
        return screen;
  }
}

function App() {
  const userList = ['ROLE_PATIENT', 'ROLE_DOCTOR', 'ROLE_ADMIN'];
  const [user, setUser] = useState("");

  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoutes user={user}/>}>
          {/*Logged out screens*/}
          <Route exact path="/join_us" element={getLoggedOutScreen(user, <JoinUs />)} />
          <Route exact path="/login" element={getLoggedOutScreen(user, <Login />)} />
          <Route exact path="/sign_up" element={getLoggedOutScreen(user, <Signup />)} />

          {/*Logged in screens*/}
          <Route exact path='/' element={getScreen(user, <PatientDashboard />, <DoctorDashboard />, <AdminDashboard />) } />
          <Route exact path='/view_appointments' element={getScreen(user, <PatientAppointments />, <DoctorAppointments />, <Navigate to="/" replace/>) } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
