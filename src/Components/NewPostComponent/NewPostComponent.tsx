import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, TextareaAutosize, Typography, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useUserData } from '../../Contexts/UserDataContext.tsx';
import { POST_SERVICE_BASE_URL } from '../../constants.ts';

interface NewPostComponentProps {
  initialContent?: string;
  onClose?: () => void; 
  postId?: string | null;
}

const NewPostComponent = ({ initialContent = '', onClose, postId = null }) => {
  const [postContent, setPostContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'Success' | 'Error' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const maxPostLength = 280;
  const { userData, setUserData } = useUserData();

  useEffect(() => {
    if (initialContent) {
      setPostContent(initialContent);
    }
  }, [initialContent]);

  const handlePostChange = (event) => {
    setPostContent(event.target.value.substring(0, maxPostLength));
    setSubmissionStatus(null);
    setErrorMessage(''); 
  };

  const handlePostSubmit = async () => {
    setIsSubmitting(true);
    setSubmissionStatus(null);
    setErrorMessage('');
    
    try {
      const response = postId? await axios.put(`${POST_SERVICE_BASE_URL}/api/post/updatePost/${userData.userId}/${postId}`, {
        userId: userData.userId,
        authorId: userData.userId,
        content: postContent
      }) : await axios.post(`${POST_SERVICE_BASE_URL}/api/post/createPost`, {
        userId: userData.userId,
        authorId: userData.userId,
        content: postContent
      });

      setSubmissionStatus('Success');
      setPostContent(''); 
      onClose && onClose();
    } catch (error) {
      setSubmissionStatus('Error');
      setErrorMessage(error.response?.data?.message || 'An error occurred while posting. Please try again.');
    }
    
    setIsSubmitting(false);
  };

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
          endIcon={isSubmitting ? <CircularProgress size={24} /> : <SendIcon />}
          disabled={isSubmitting || postContent.length === 0 || postContent.length > maxPostLength}
        >
          Post
        </Button>
      </Box>
      {submissionStatus === 'Success' && (
        <Typography color="green" sx={{ mt: 2 }}>
          Post submitted successfully!
        </Typography>
      )}
      {submissionStatus === 'Error' && (
        <Typography color="red" sx={{ mt: 2 }}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default NewPostComponent;
