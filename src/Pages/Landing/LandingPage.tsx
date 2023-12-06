import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Button, Box, Typography, CircularProgress, Container, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  textAlign: 'center',
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
}));

const BackgroundContainer = styled(Box)(({ theme }) => ({
  backgroundImage: 'url("https://st2.depositphotos.com/3725083/5485/i/450/depositphotos_54856347-stock-photo-travel-the-world-monument-concept.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const TeamSection = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(5),
    padding: theme.spacing(2),
    backgroundColor: 'rgb(28, 185, 199, 0.2)',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  

export default function LandingPage() {
    const { loginWithRedirect, error, isLoading } = useAuth0();

    return (
        <BackgroundContainer>
            <StyledContainer maxWidth="sm">
                <Typography variant="h2" color="primary" gutterBottom>
                    Travel Tales
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: '2rem' }}>
                    Discover and Share Your Travel Stories
                </Typography>

                {error && <Typography color="error">Authentication Error</Typography>} 
                {isLoading && <CircularProgress />}
                {!error && !isLoading && 
                    <Button variant="contained" color="primary" onClick={() => { loginWithRedirect(); }}>
                        Start Your Journey
                    </Button>
                }

                    <TeamSection>
                    <Typography variant="h6" color="textSecondary">
                        Created by Team
                    </Typography>
                    <Typography variant="subtitle1" color="primary" sx={{ mt: 1, fontWeight: 'bold' }}>
                        Vijitha, Moukthika, Pallavi, Keerthana
                    </Typography>
                </TeamSection>
            </StyledContainer>
        </BackgroundContainer>
    );
}
