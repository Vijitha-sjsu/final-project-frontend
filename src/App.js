import './App.css';
import SignupPage from './Pages/Signup/SignupPage.tsx';
import ProfilePage from './Pages/Profile/ProfilePage.tsx'
import HomePage from './Pages/Home/HomePage.tsx'
import LandingPage from './Pages/Landing/LandingPage.tsx'
import SearchPage from './Pages/Search/SearchPage.tsx'
import AdminDashboard from './Pages/Admin/AdminDashboard.tsx';
import { Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { AuthenticationGuard } from './Components/AuthComponent/AutheticationGuard.tsx';

function App() {
  const { isAuthenticated, user } = useAuth0();
  
  return (
    <Routes>
      {!isAuthenticated && <Route path="/" element={<LandingPage />} />}
      {isAuthenticated && <Route path="/" element={<SignupPage />} />}
      {isAuthenticated && user && user['https://claims.traveltales.com/roles'].includes('Admin') && <Route path="/admin" element={<AdminDashboard/>}/>}
      <Route path="/home" element={<AuthenticationGuard component = {HomePage}/>} />
      <Route path="/profile" element={<AuthenticationGuard component = {ProfilePage} />} />
      <Route path="/search" element={<AuthenticationGuard component = {SearchPage} />} />
    </Routes>
  );
}

export default App;