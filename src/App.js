import './App.css';
import HomePage from './Pages/Home/HomePage.tsx'
import ProfilePage from './Pages/Profile/ProfilePage.tsx'
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
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  
  return (
    <>
    {!isAuthenticated && <button onClick={() => loginWithRedirect()}>Log In</button>}
    {isAuthenticated && <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>}
    {isAuthenticated && <HomePage/>}
    </>
    
    //TODO Routes
    // <Routes>
    //   <Route path="/" element={<HomePage />} />
    //   <Route path="/profile" element={<ProfilePage profileData={profileData} />} />
    // </Routes>
  );
}

export default App;

