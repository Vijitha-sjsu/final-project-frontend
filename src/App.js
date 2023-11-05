import './App.css';
import TweetComponent from './Components/TweetComponent/TweetComponent.tsx';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={15}>
        <Grid xs={3}>
          <div style={{ backgroundColor: 'blue' }}>1</div>
        </Grid>
        <Grid xs={6} style={{ backgroundColor: 'red' }}>
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
        <Grid xs={3}>
          <div style={{ backgroundColor: 'yellow' }}>3</div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
