import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ModalComponent from '../../Components/ModalComponent/ModalComponent.tsx';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../../Contexts/UserDataContext.tsx';

const SignupPage = React.memo(() => {

    const { setUserData } = useUserData();
    const navigate = useNavigate();
    const { user } = useAuth0();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleModalClose = () => {
      setIsModalOpen(false);
    };
  
    const handleSave = (formData) => {
      const url = 'https://follow-service/api/users/create';
      formData = {...formData, 'email': user?.email, 'userId': user?.sub}
      axios.post(url, formData)
        .then(response => {
          setUserData(response.data);
          setIsModalOpen(false);
          setErrorMessage('');
          navigate('/home');
        })
        .catch(error => {
          if (error.response && error.response.status === 409) {
            setErrorMessage('A user with this username already exists. Please try a different username.');
          } else {
            console.error('Error saving user data:', error);
          }
        });
    };

    useEffect(() => {
        const userId = user?.sub;
        const url = `https://follow-service/api/users/getUser/${userId}`;
        axios.get(url)
          .then(response => {
            setUserData(response.data);
            navigate('/home');
        })
          .catch(error => {
            if (error.response && error.response.status === 404) {
              setIsModalOpen(true);
            } else {
              console.error('Error fetching user data:', error);
            }
          });
      }, []);

    return  <Box>
        <p>Loading...</p>
        <ModalComponent open={isModalOpen} 
            onClose={handleModalClose} 
            onSave={handleSave}
            errorMessage={errorMessage}
            initialState={{
              firstName: '',
              lastName: '',
              username: '',
              location: '',
              tagline: '',
            }}
            allowClose={false}/>
        </Box>
});

export default SignupPage;