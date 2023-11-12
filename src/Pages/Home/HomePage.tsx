import TweetComponent from '../../Components/TweetComponent/TweetComponent.tsx';
import ProfileCard from '../../Components/ProfileCardComponent/ProfileCardComponent.tsx';
import SidebarComponent from '../../Components/SidebarComponent/SidebarComponent.tsx'
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserData } from '../../Contexts/UserDataContext.tsx';

const HomePage: React.FC = ()=> {
  const { logout } = useAuth0();
  const { userData } = useUserData();

  return (
    <div>
      <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
       Log Out
     </button>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={8} sx={{ mt: 2 }}> 
        <Grid xs={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}> 
        <ProfileCard profileData={{
          name: `${userData.firstName} ${userData.lastName }`.trim(),
          username: userData.username,
          location: userData.location ,
          tagLine: userData.tagline ,
          followerCount: userData.followers.length,
          followingCount: userData.following.length,
        }} />
        </Grid>
        <Grid xs={6} >
          <Grid container direction={'column'} spacing={3}>
            <Grid >
              <TweetComponent id={1} user={{username:"Vijitha Gunta", id: "userId"}} time={"Nov 5"} textContent='Yaay, my first tweet!' />
            </Grid>
            <Grid >
              <TweetComponent id={1} user={{username:"Joe Dane", id: "userId"}} time={"Nov 5"} textContent='Yaay, my first tweet!' />
            </Grid>
            <Grid >
              <TweetComponent id={1} user={{username:"John doe", id: "userId"}} time={"Nov 5"} textContent='Yaay, my first tweet!' />
            </Grid>
            <Grid >
              <TweetComponent id={1} user={{username:"Prateek Sharma", id: "userId"}} time={"Nov 5"} textContent='Yaay, my first tweet!' />
            </Grid>
            <Grid >
              <TweetComponent id={1} user={{username:"Suri P", id: "userId"}} time={"Nov 5"} textContent='Yaay, my first tweet!' />
            </Grid>
            <Grid >
              <TweetComponent id={1} user={{username:"Neelesh G", id: "userId"}} time={"Nov 5"} textContent='Yaay, my first tweet!' />
            </Grid>
            <Grid >
              <TweetComponent id={1} user={{username:"EMily Howard", id: "userId"}} time={"Nov 5"} textContent='Yaay, my first tweet!' />
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          <Grid container direction={'column'} spacing={3}>
            <SidebarComponent/>
          </Grid>
        </Grid>
      </Grid>
    </Box>
    </div>
  );
}

export default HomePage;