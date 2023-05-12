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
import RegisterDoctor from './pages/RegisterDoctor';
import RegisterAdmin from './pages/RegisterAdmin';
import DoctorAccount from './pages/DoctorAccount';

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
    case "ROLE_PATIENT":
    case "ROLE_DOCTOR":
    case "ROLE_ADMIN":
      return <Navigate to="/" replace/>;
    default:
        return screen;
  }
}

function getAdminScreen (user, screen){
  switch(user) {
    case "ROLE_ADMIN":
      return screen;
    default:
      return <Navigate to="/" replace/>;
  }
}

function getDoctorScreen (user, screen){
  switch(user) {
    case "ROLE_DOCTOR":
      return screen;
    default:
      return <Navigate to="/" replace/>;
  }
}

function getAccountScreen(user,screen){
    switch (user){
        case "ROLE_DOCTOR":
            return screen;
        default:
            return <navigate to="/" replace/>;
    }
}

function App() {
  const userList = ['ROLE_PATIENT', 'ROLE_DOCTOR', 'ROLE_ADMIN'];
  const [user, setUser] = useState('ROLE_DOCTOR');

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
          <Route exact path='/register_admin' element={getAdminScreen(user, <RegisterAdmin />)} />
          <Route exact path="/register_doctor" element={getAdminScreen(user, <RegisterDoctor />)} />
          <Route exact path="/account" element={getAccountScreen(user, <DoctorAccount />)} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
