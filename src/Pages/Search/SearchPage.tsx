import React, { useState } from 'react';
import { TextField, Box, Button, Grid, Typography } from '@mui/material';
import axios from 'axios';
import SidebarComponent from '../../Components/SidebarComponent/SidebarComponent.tsx';
import ProfileCard from '../../Components/ProfileCardComponent/ProfileCardComponent.tsx';
import { useUserData, UserData } from '../../Contexts/UserDataContext.tsx';
import CheckIcon from '@mui/icons-material/Check';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { userData } = useUserData();
  const [followedUsers, setFollowedUsers] = useState([]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFollowUser = (userId) => {
    setFollowedUsers(prev => [...prev, userId]);
    // make an API call here to update the following status in backend
  };

  const handleSearchSubmit = async () => {
    if (!searchQuery.trim()) {
        return;
      }
    setIsLoading(true);
    setErrorMessage('');
    setFollowedUsers([]);
    try {
        const response = await axios.get(`http://localhost:8050/api/users/search?keyword=${searchQuery}`);
        setSearchResults(response.data);
    } catch (error) {
        const message = error.response && error.response.data ? error.response.data.message : error.message;
        setErrorMessage(`Error fetching search results: ${message}`);
    }
    setIsLoading(false);
  };

  console.log('my ' + userData.userId)
  


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <SidebarComponent />
        </Grid>
        <Grid item xs={9}>
            <Box sx={{ padding: 2 }}>
            <Box display="flex" gap={2} mb={2}>
                <TextField
                fullWidth
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search"
                onKeyUp={(event) => event.key === 'Enter' && handleSearchSubmit()}
                />
                <Button variant="contained" onClick={handleSearchSubmit}>Search</Button>
            </Box>

            {isLoading && <div>Loading...</div>}
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {searchResults.length > 0 && searchResults.map( profile => {console.log('to follow ' + profile.userId)

                    return (<Box sx={{width: '75%', marginBottom: 2}}>
                        <ProfileCard profileData={profile} />
                        {followedUsers.includes(profile.userId) ? (
      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
        <Typography>User Followed</Typography>
        <CheckIcon color="success" />
      </Box>
    ) : (
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => handleFollowUser(profile.userId)}
        sx={{ marginTop: 1 }}
      >
        Follow User
      </Button>
    )}
                    </Box>)
})}
            </Box>
            </Box>
        </Grid>
    </Grid>
    </Box>
  );
};

export default SearchPage;