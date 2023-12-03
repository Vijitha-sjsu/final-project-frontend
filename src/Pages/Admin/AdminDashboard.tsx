import React, { useState } from 'react';
import { TextField, Box, Button, Grid, Stack, Divider } from '@mui/material';
import axios from 'axios';
import SidebarComponent from '../../Components/SidebarComponent/SidebarComponent.tsx';
import { useAuth0 } from '@auth0/auth0-react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { POST_SERVICE_BASE_URL } from '../../constants.ts';
import TweetComponent from '../../Components/TweetComponent/TweetComponent.tsx';

const AdminDashboard = () => {
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);
  const [userId, setUserId] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  const handleSearchSubmit = async () => {
    setIsLoading(true);
    setErrorMessage('');

    let params: { [key: string]: string } = {};
    if (fromDate) params.fromDate = fromDate.format('YYYY-MM-DDT00:00:00');
    if (toDate) params.toDate = toDate.format('YYYY-MM-DDT23:59:59');
    if (userId) params.userId = userId;
    if (content) params.content = content;

    try {
      const response = await axios.get(`${POST_SERVICE_BASE_URL}/api/post/searchPosts`, {
        params
      });

      setSearchResults(response.data);
    } catch (error) {
      const message = error.response && error.response.data ? error.response.data.message : error.message;
      setErrorMessage(`Error fetching posts: ${message}`);
    }

    setIsLoading(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <SidebarComponent initialTab={3} isAdmin={true} />
          </Grid>

          <Grid item xs={9} sx={{ height: 'calc(100vh)', overflowY: 'auto' }}>
            <Box sx={{ padding: 2 }}>
              
              {/* Content TextField */}
              <TextField fullWidth value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" sx={{mb: 2}}/>

              {/* UserId, FromDate, ToDate Fields */}
              <Grid container spacing={10}>
                <Grid item xs={4}>
                  <TextField fullWidth value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="User ID" />
                </Grid>
                <Grid item xs={4}>
                  <DesktopDatePicker
                    label="From Date"
                    inputFormat="MM/DD/YYYY"
                    value={fromDate}
                    onChange={(newValue) => setFromDate(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
                <Grid item xs={4}>
                  <DesktopDatePicker
                    label="To Date"
                    inputFormat="MM/DD/YYYY"
                    value={toDate}
                    onChange={(newValue) => setToDate(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
              </Grid>

              {/* Search Button */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button onClick={handleSearchSubmit} variant="contained" sx={{ width: '50%' }}>Search</Button>
              </Box>


              {isLoading && <div>Loading...</div>}
              {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

              <Grid container direction={'column'} spacing={3}>
                <Divider sx={{ width: '60%', my: 5, mx: 'auto', borderColor: 'rgba(0, 0, 0, 0.12)' }} />
                <Box sx={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                  {searchResults.map((tweet, index) => (
                    <Grid key={tweet.postId} item sx={{mb: 2}}>
                      <TweetComponent userId={tweet.authorId} authorId={tweet.authorId} postId={tweet.postId} createdDate={tweet.createdDate} lastModifiedDate={tweet.lastModifiedDate} content={tweet.content} />
                    </Grid>
                  ))}
                </Box>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default AdminDashboard;
