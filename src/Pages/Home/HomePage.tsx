import TweetComponent from '../../Components/TweetComponent/TweetComponent.tsx';
import ProfileCard from '../../Components/ProfileCardComponent/ProfileCardComponent.tsx';
import SidebarComponent from '../../Components/SidebarComponent/SidebarComponent.tsx'
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserData } from '../../Contexts/UserDataContext.tsx';
import NewPostComponent from '../../Components/NewPostComponent/NewPostComponent.tsx';
import axios from 'axios';

const HomePage: React.FC = ()=> {
  const { logout } = useAuth0();
  const { userData } = useUserData();
  const [tweets, setTweets] = useState([]);

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
    loadMoreTweets();
  }, []);

  const loadMoreTweets = async () => {
    setLoading(true);
    try {
      const olderThan = tweets.length > 0 ? tweets[tweets.length - 1].tweetTimestamp : null;
      let response = null;
      if (olderThan === null ){
        response = await axios.get(`https://feed-service:443/user_feed/${userData.userId}?limit=100`);
      }
      else {
        response = await axios.get(`https://feed-service:443/user_feed/${userData.userId}?limit=100&older_than=${olderThan}`);
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
      <Grid container spacing={3} sx={{ mt: 2, mr:2 }}> 
      <Grid xs={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          <SidebarComponent/>
      </Grid>
      <Grid xs={6} >
          <Grid container direction={'column'} spacing={3}>
            <NewPostComponent />
              {tweets.map((tweet, index) => (
                <Grid key={tweet.id} ref={index === tweets.length - 1 ? lastTweetElementRef : null}>
                  <TweetComponent userId={tweet.author_id} authorId={tweet.author_id} postId={tweet.tweetId} createdDate={tweet.tweetTimestamp} lastModifiedDate={tweet.tweetTimestamp} content={tweet.content} />
                </Grid>
              ))}
            </Grid>
            {loading && <p>Loading more tweets...</p>}
      </Grid>
      <Grid xs={3} > 
          <ProfileCard profileData={userData} />
      </Grid>
      </Grid>
    </Box>
    </div>
  );
}

export default HomePage;