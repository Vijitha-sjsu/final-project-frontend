import TweetComponent from '../../Components/TweetComponent/TweetComponent.tsx';
import ProfileCard from '../../Components/ProfileCardComponent/ProfileCardComponent.tsx';
import SidebarComponent from '../../Components/SidebarComponent/SidebarComponent.tsx'
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useUserData } from '../../Contexts/UserDataContext.tsx';
import NewPostComponent from '../../Components/NewPostComponent/NewPostComponent.tsx';
import axios from 'axios';
import { FEED_SERVICE_BASE_URL, FOLLOW_SERVICE_BASE_URL } from '../../constants.ts';
import { useAuth0 } from '@auth0/auth0-react';
import { Divider } from '@mui/material';
import ChatTravelAI from '../../Components/Chat/ChatTravelAI.js';
import './HomePage.css'; 

const HomePage: React.FC = ()=> {
  const { userData, setUserData } = useUserData();
  const [tweets, setTweets] = useState([]);
  const { isLoading, isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const lastTweetElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreTweets();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        setAccessToken(token);
        const userRoles = user && user['https://claims.traveltales.com/roles']
        setIsAdmin(userRoles.includes('Admin'))
      } catch (error) {
        console.error('Error getting access token', error);
        setAccessToken(null);
      }
    };

    fetchToken();
    
  }, [getAccessTokenSilently]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userId = user?.sub;
        const url = `${FOLLOW_SERVICE_BASE_URL}/api/users/getUser/${userId}`;
        const response = await axios.get(url);
        setUserData(response.data); 
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    loadMoreTweets();
  }, [isLoading, isAuthenticated, user]);

  const loadMoreTweets = async () => {
    setLoading(true);
    try {
      const olderThan = tweets.length > 0 ? tweets[tweets.length - 1].tweetTimestamp : null;
      let response = null;
      if (olderThan === null ){
        response = await axios.get(`${FEED_SERVICE_BASE_URL}/user_feed/${userData.userId}?limit=100`);
      }
      else {
        response = await axios.get(`${FEED_SERVICE_BASE_URL}/user_feed/${userData.userId}?limit=100&older_than=${olderThan}`);
      }
      setTweets(prevTweets => {
        const filteredNewTweets = response.data.filter(newTweet => 
          !prevTweets.some(prevTweet => prevTweet.tweetId === newTweet.tweetId)
        );
        return [...prevTweets, ...filteredNewTweets];
      });
      setHasMore(response.data.length > 0);
    } catch (error) {
            console.error("Error fetching tweets:", error);
    }
    setLoading(false);
  };

  return (
    <div>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} > 
      <Grid xs={3} >
          <SidebarComponent isAdmin={isAdmin} initialTab={0}/>
      </Grid>
      <Grid xs={6} >
          <Grid container direction={'column'} spacing={3}>
            <NewPostComponent />
            <Divider sx={{ width: '60%', my: 2, mx: 'auto', borderColor: 'rgba(0, 0, 0, 0.12)' }} />
              <Box sx={{
                maxHeight: 'calc(100vh - 200px)', 
                overflowY: 'auto'
              }}>
                  {tweets.map((tweet, index) => { 
                    
                    // Determine if the current user has liked the tweet
                  const isLiked = tweet.likes?.includes(userData.userId);

                  return(
                <Grid key={tweet.id} ref={index === tweets.length - 1 ? lastTweetElementRef : null}>
                  <TweetComponent userId={tweet.author_id} authorId={tweet.author_id} postId={tweet.tweetId} createdDate={tweet.tweetTimestamp} lastModifiedDate={tweet.tweetTimestamp} content={tweet.content} unfollow={true} isLiked={isLiked} likes = {tweet.likes}/>
                </Grid>
              )})}
              </Box>
            </Grid>
            {loading && <p>Loading more tweets...</p>}
      </Grid>
      <Grid xs={3} > 
          <ProfileCard profileData={userData} />
          <Box className="chat-travel-ai">
            <ChatTravelAI />
          </Box>
      </Grid>
      </Grid>
    </Box>
    </div>
  );
}

export default HomePage;