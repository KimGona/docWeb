import React from 'react';
import { BrowserRouter as Router, Routes, Route, redirect } from 'react-router-dom';
import PatientDashboard from './pages/PatientDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<PatientDashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;
