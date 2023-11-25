import React, { useState } from 'react';
import { TextField, Box, Button, Grid, Typography } from '@mui/material';
import axios from 'axios';
import SidebarComponent from '../../Components/SidebarComponent/SidebarComponent.tsx';
import ProfileCard from '../../Components/ProfileCardComponent/ProfileCardComponent.tsx';
import CheckIcon from '@mui/icons-material/Check';
import { UserData, useUserData } from '../../Contexts/UserDataContext.tsx';
import { FOLLOW_SERVICE_BASE_URL } from '../../constants.ts';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { userData, setUserData } = useUserData();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFollowUser = async (userIdToFollow) => {
    setIsLoading(true);
    try {
      await axios.post(`${FOLLOW_SERVICE_BASE_URL}/api/users/${userData.userId}/follow/${userIdToFollow}`);
      const updatedUserData = {
        ...userData,
        following: [...userData.following, userIdToFollow]
      };
      setUserData(updatedUserData);
  
      const updatedSearchResults = searchResults.map(profile => {
        if (profile.userId === userIdToFollow) {
          return { ...profile, followers: [...profile.followers, userData.userId] };
        }
        return profile;
      });
      setSearchResults(updatedSearchResults);
      
    } catch (error) {
      const message = error.response && error.response.data ? error.response.data.message : error.message;
      setErrorMessage(`Error following user: ${message}`);
    }
    setIsLoading(false);
  };

  const handleSearchSubmit = async () => {
    if (!searchQuery.trim()) {
        return;
      }
    setIsLoading(true);
    setErrorMessage('');
    try {
        const searchRequest = axios.get(`${FOLLOW_SERVICE_BASE_URL}/api/users/search?keyword=${searchQuery}`);
        const userRequest = axios.get(`${FOLLOW_SERVICE_BASE_URL}/api/users/getUser/${userData.userId}`);

        const [userResponse, searchResponse] = await Promise.all([userRequest, searchRequest]);

        setSearchResults(searchResponse.data);
        setUserData(userResponse.data);
    } catch (error) {
        const message = error.response && error.response.data ? error.response.data.message : error.message;
        setErrorMessage(`Error fetching search results: ${message}`);
    }
    setIsLoading(false);
  };

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
                {searchResults.length > 0 && searchResults.map( profile => {
                    return (<Box sx={{width: '75%', marginBottom: 2}}>
                        <ProfileCard profileData={profile} />
                        {!userData?.following.includes(profile?.userId) && 
                          <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={() => handleFollowUser(profile?.userId)}
                            sx={{ marginTop: 1 }}
                          >
                            Follow User
                          </Button>}
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