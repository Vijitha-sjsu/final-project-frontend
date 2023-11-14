import React, { useState } from 'react';
import { Box, Button, TextareaAutosize, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const NewPostComponent= () => {
  const [postContent, setPostContent] = useState('');
  const maxPostLength = 280;

  const handlePostChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(event.target.value.substring(0, maxPostLength));
  };

  const handlePostSubmit = () => {
    // Add logic to handle the submission of the post
    console.log(postContent);
      setPostContent('');
    }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
      <TextareaAutosize
        aria-label="What's happening?"
        placeholder="What's happening?"
        style={{ width: '100%', fontSize: '1rem', padding: '8px', marginBottom: '10px' }}
        minRows={3}
        value={postContent}
        onChange={handlePostChange}
        maxLength={maxPostLength}
      />
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography 
          sx={{ 
            fontSize: '0.75rem', 
            color: postContent.length === maxPostLength ? 'red' : 'grey' 
          }}
        >
          {postContent.length}/{maxPostLength}
        </Typography>
        <Button
          onClick={handlePostSubmit}
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          disabled={postContent.length === 0 || postContent.length > maxPostLength}
        >
          Post
        </Button>
      </Box>
    </Box>
  );
};

export default NewPostComponent;
