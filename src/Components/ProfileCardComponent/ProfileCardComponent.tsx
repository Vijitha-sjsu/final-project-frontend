import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import CustomAvatar from '../AvatarComponent/AvatarComponent.tsx'; 
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { useTheme } from '@mui/material/styles';

const ProfileCard: React.FC<any> = ({ profileData }) => {
  const theme = useTheme(); 

  return (
    <Card sx={{ 
      borderRadius: '16px', 
      margin: 3,
      boxShadow: 10,
      border: `1px solid ${theme.palette.divider}`, 
    }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        paddingY: 2,
        backgroundColor: theme.palette.primary.main, 
        color: theme.palette.primary.contrastText, 
      }}>
        <CustomAvatar name={profileData.firstName + " " + profileData.lastName} size={100} />
        <Typography variant="h5" component="div">
          {profileData.firstName + " " + profileData.lastName}
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}> 
          @{profileData.username} 
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}> 
          {profileData.email}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 3 }}>
          <FmdGoodOutlinedIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            {profileData.location}
          </Typography>
        </Box>
      </Box>
      <CardContent sx={{ backgroundColor: theme.palette.background.paper }}> 
        <Typography variant="body2" color={theme.palette.primary.main} textAlign="center" sx={{
          wordBreak: 'break-word', 
          overflowWrap: 'break-word',
        }}>
          {profileData.tagline}
        </Typography>
        <Grid container spacing={2} sx={{ marginTop: 2, justifyContent: 'center' }}>
          <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Followers
            </Typography>
            <Typography variant="subtitle1" color="text.primary">
              {profileData.followers.length}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Following
            </Typography>
            <Typography variant="subtitle1" color="text.primary">
              {profileData.following.length}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
