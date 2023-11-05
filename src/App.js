import './App.css';
import TweetComponent from './Components/TweetComponent/TweetComponent.tsx';
import ProfileCard from './Components/ProfileCardComponent/ProfileCardComponent.tsx';
import SidebarComponent from './Components/SidebarComponent/SidebarComponent.tsx';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={8} sx={{ mt: 2 }}> 
        <Grid xs={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}> 
          <ProfileCard profileData={{
              name: "Petar Kajba",
              location: "Croatia",
              tagLine: "UI, UX Designer and Web Developer from Croatia",
              tweetCount: 19,
              followerCount: 499,
              followingCount: 46,
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
  );
}

export default App;

