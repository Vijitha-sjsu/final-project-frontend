import React, { useState } from 'react';
import { TextField, Box, Button, Grid, Divider, Modal } from '@mui/material';
import axios from 'axios';
import SidebarComponent from '../../Components/SidebarComponent/SidebarComponent.tsx';
import { useAuth0 } from '@auth0/auth0-react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { POST_SERVICE_BASE_URL } from '../../constants.ts';
import TweetComponent from '../../Components/TweetComponent/TweetComponent.tsx';
import NewPostComponent from '../../Components/NewPostComponent/NewPostComponent.tsx';
import { useUserData } from '../../Contexts/UserDataContext.tsx';

const AdminPostModeration = () => {
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);
  const [userId, setUserId] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const { getAccessTokenSilently } = useAuth0();
  const { userData } = useUserData();

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

    // Sort the search results in descending order by lastModifiedDate
    const sortedResults = response.data.sort((a, b) => dayjs(b.lastModifiedDate).diff(dayjs(a.lastModifiedDate)));
    setSearchResults(sortedResults);
    } catch (error) {
      const message = error.response && error.response.data ? error.response.data.message : error.message;
      setErrorMessage(`Error fetching posts: ${message}`);
    }

    setIsLoading(false);
  };

  const handleEditPostClick = (post) => {
    setEditingPost(post); 
    setIsEditModalOpen(true); 
  };

  const handleDeletePostClick = async (postId) => {
    try {
        await axios.delete(`${POST_SERVICE_BASE_URL}/api/post/deletePost/${userData.userId}/${postId}`, {
            params: {
                isAdmin: true
            }
        });
        handleSearchSubmit();
    } catch (error) {
        console.error("Failed to delete the post:", error);
    }
};

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ flexGrow: 1 }}>
      <Modal
        open={isEditModalOpen}
        onClose={() => {setIsEditModalOpen(false);}}
        aria-labelledby="edit-post-modal"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box sx={{ 
          backgroundColor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          width: 700
        }}>
          <NewPostComponent initialContent={editingPost?.content || ''} onClose={() => {setIsEditModalOpen(false); handleSearchSubmit();}}
        postId={editingPost?.postId} isAdmin={true}/>
        </Box>
      </Modal>
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
                    <Grid key={tweet.postId} item sx={{m: 2}}>
                      <TweetComponent userId={tweet.authorId} authorId={tweet.authorId} postId={tweet.postId} createdDate={tweet.createdDate} lastModifiedDate={tweet.lastModifiedDate} content={tweet.content} onEditPost={() => handleEditPostClick(tweet)} onDeletePost={handleDeletePostClick} showLike={false}/>
                    </Grid>
                  ))}
                </Box>
              </Grid>
            </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default AdminPostModeration;