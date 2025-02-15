import React, { useState, useEffect } from 'react';
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
import AppointmentDoctors from './pages/AppointmentDoctors';
import AppointmentVisitTypes from './pages/AppointmentVisitTypes';
import AppointmentTime from './pages/AppointmentTime';
import AppointmentTimeAlternative from './pages/AppointmentTimeAlternative';
import AppointmentConfirmation from './pages/AppointmentConfirmation';
import AppointmentSummary from './pages/AppointmentSummary';
import DoctorOffTime from './pages/DoctorOffTime';
import PatientChangeAppointment from './pages/PatientChangeAppointment';
import PatientAccount from './pages/PatientAccount';
import DoctorAddResult from './pages/DoctorAddResult';
import DoctorWriteResult from './pages/DoctorWriteResult';
import PatientHealthResult from './pages/PatientHealthResult';
import DoctorHealthResult from './pages/DoctorHealthResult';
import useLocalStorage, { userRoleKey, userIDKey} from './hooks/LocalStorageHook';
import AdminAddVisitTypes from './pages/AdminAddVisitTypes';
import Clarity from '@microsoft/clarity';
import DoctorCheckSchedule from './pages/DoctorCheckSchedule';
import DoctorOffTimeAlternative from './pages/DoctorOffTimeAlternative';
import RegisterDoctorAlternative from './pages/RegisterDoctorAlternative';

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

function getSingleScreen (chosenUser, user, screen) {
  if (chosenUser === user)
    return screen;
  else return <Navigate to="/" replace/>;
}

function App() {
  const userList = ['ROLE_PATIENT', 'ROLE_DOCTOR', 'ROLE_ADMIN'];
  
  const [user, setUser, removeUser] = useLocalStorage(userRoleKey, "");
  // const [user, setUser] = useState("ROLE_ADMIN");
  const onUserChange = (usern) => setUser(usern);
  const onRemoveUser = () => removeUser();
  
  const [userId, setUserId, removeUserId] = useLocalStorage(userIDKey, "");
  const onUserIdChange = (id) => setUserId(id);
  const onRemovedUserId = () => removeUserId();
  
  const hiddenNavbarRoutes = ["/appointment_doctors", "/appointment_visit_types", "/appointment_time", "/edit_appointment", "/check_off_time_alternative"]

  const onLogout = () => {
    onRemoveUser();
    onRemovedUserId();
    window.location.reload();
  }

  const projectId = "p3n8rpk6nr"
  useEffect(() => {
    Clarity.init(projectId);
  }, [])

  const scenario = "A"  // "A" or "B"
  
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoutes user={user} isHidden={hiddenNavbarRoutes.includes(window.location.pathname)} onLogout={() => onLogout()} scenario={scenario}/>}>
          {/*Logged out screens*/}
          <Route exact path="/join_us" element={getLoggedOutScreen(user, <JoinUs />)} />
          <Route exact path="/login" element={getLoggedOutScreen(user, <Login  onUserChange={onUserChange} onUserIdChange={onUserIdChange} />)} />
          <Route exact path="/sign_up" element={getLoggedOutScreen(user, <Signup />)} />

          {/*Logged in screens*/}
          <Route exact path='/' element={getScreen(user, <PatientDashboard />, <DoctorDashboard />, <AdminDashboard />) } />
          <Route exact path='/view_appointments' element={getScreen(user, <PatientAppointments />, <DoctorAppointments />, <Navigate to="/" replace/>) } />
          <Route exact path='/account' element={getScreen(user, <PatientAccount onLogout={() => onLogout()}/>, <DoctorAccount userId={userId} onLogout={() => onLogout()}/>, <Navigate to="/" replace/>) } />
          <Route exact path='/appointment_doctors' element={getScreen(user, <AppointmentDoctors />, <Navigate to="/" replace/>, <Navigate to="/" replace/>)} />
          <Route exact path='/appointment_visit_types' element={getScreen(user, <AppointmentVisitTypes />, <Navigate to="/" replace/>, <Navigate to="/" replace/>)} />
          <Route exact path='/appointment_time' element={getScreen(user, scenario == "A" ? <AppointmentTimeAlternative /> : <AppointmentTime />, <Navigate to="/" replace/>, <Navigate to="/" replace/>)} />
          <Route exact path='/appointment_summary' element={getScreen(user, <AppointmentSummary />, <Navigate to="/" replace/>, <Navigate to="/" replace/>)} />
          <Route exact path='/appointment_confirmation' element={getScreen(user, <AppointmentConfirmation />, <Navigate to="/" replace/>, <Navigate to="/" replace/>)} />
          <Route exact path='/view_results' element={getScreen(user, <PatientHealthResult />,<DoctorHealthResult /> ,<Navigate to="/" replace/>) } />

          {/*Doctor only*/}
          <Route exact path='/check_off_time' element={getSingleScreen("ROLE_DOCTOR", user, <DoctorOffTime />)} />
          <Route exact path='/write_results' element={getSingleScreen("ROLE_DOCTOR", user, <DoctorWriteResult />)} />
          <Route exact path='/add_result' element={getSingleScreen("ROLE_DOCTOR", user, <DoctorAddResult />)} />
          <Route exact path='/check_schedule' element={getSingleScreen("ROLE_DOCTOR", user, <DoctorCheckSchedule />)} />
          <Route exact path='/check_off_time_alternative' element={getSingleScreen("ROLE_DOCTOR", user, <DoctorOffTimeAlternative />)} />
          
          {/*Patient only*/}
          <Route exact path='/edit_appointment' element={getSingleScreen("ROLE_PATIENT", user, <PatientChangeAppointment />)} />

          {/*Admin only*/}
          <Route exact path='/register_admin' element={getSingleScreen("ROLE_ADMIN", user, <RegisterAdmin />)} />
          <Route exact path="/register_doctor" element={getSingleScreen("ROLE_ADMIN", user, <RegisterDoctorAlternative />)} />
          <Route exact path="/add_visit_types" element={getSingleScreen("ROLE_ADMIN", user, <AdminAddVisitTypes />)} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
