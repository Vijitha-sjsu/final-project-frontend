import './App.css';
import SignupPage from './Pages/Signup/SignupPage.tsx';
import ProfilePage from './Pages/Profile/ProfilePage.tsx'
import HomePage from './Pages/Home/HomePage.tsx'
import LandingPage from './Pages/Landing/LandingPage.tsx'
import SearchPage from './Pages/Search/SearchPage.tsx'
import { Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { isAuthenticated } = useAuth0();
  
  return (
    <Routes>
      {!isAuthenticated && <Route path="/" element={<LandingPage />} />}
      {isAuthenticated && <Route path="/" element={<SignupPage />} />}
      <Route path="/home" element={<HomePage/>} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default App;