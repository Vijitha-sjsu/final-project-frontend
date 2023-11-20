import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid, Box } from '@mui/material';
import CustomAvatar from '../AvatarComponent/AvatarComponent.tsx'; 
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';

const ProfileCard: React.FC<any> = ({ profileData }) => {
  return (
    <Card sx={{ backgroundColor: 'background.default',  borderRadius: '16px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingY: 2 }}>
        <CustomAvatar name={profileData.firstName + " " + profileData.lastName} size={100} />
        <Typography gutterBottom variant="h5" component="div">
          {profileData.firstName + " " + profileData.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          @{profileData.username} 
        </Typography>
        {profileData.email}
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 0.5 }}>
          <FmdGoodOutlinedIcon color="action"  />
          <Typography variant="body2" color="text.secondary">
            {profileData.location}
          </Typography>
        </Box>
      </Box>
      <CardContent>
        <Typography variant="body2" color="text.primary" textAlign="center">
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
