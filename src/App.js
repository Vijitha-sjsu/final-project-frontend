import './App.css';
import SignupPage from './Pages/Signup/SignupPage.tsx';
import ProfilePage from './Pages/Profile/ProfilePage.tsx'
import HomePage from './Pages/Home/HomePage.tsx'
import LandingPage from './Pages/Landing/LandingPage.tsx'
import { Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const profileData = {
  name: "Petar Kajba",
  location: "Croatia",
  tagLine: "UI/UX Designer and Web Developer from Croatia",
  tweetCount: 19,
  followerCount: 499,
  followingCount: 46, 
  joinDate: "Nov 1, 2023"
};

function App() {
  const { isAuthenticated } = useAuth0();
  
  return (
    <Routes>
      {!isAuthenticated && <Route path="/" element={<LandingPage />} />}
      {isAuthenticated && <Route path="/" element={<SignupPage />} />}
      <Route path="/home" element={<HomePage/>} />
      <Route path="/profile" element={<ProfilePage profileData={profileData} />} />
    </Routes>
  );
}

export default App;