import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import LandingPage from "./components/LandingPage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ApplicantDashboard from './dashboards/Applicant';
import AdminDashboard from './dashboards/Admin';
import BotDashboard from './dashboards/BotDashboard';

function App() {
  return (
    
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/dashboard/applicant" element={<ApplicantDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/bot" element={<BotDashboard />} />
        </Routes>
      </AuthProvider> 
  );
}

export default App;
