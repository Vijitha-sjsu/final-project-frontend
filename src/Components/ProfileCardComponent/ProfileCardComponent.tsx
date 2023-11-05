import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid, Box } from '@mui/material';
import CustomAvatar from '../AvatarComponent/AvatarComponent.tsx'; 
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';

export interface ProfileData {
    name: string;
    location: string;
    tagLine: string;
    tweetCount: number;
    followerCount: number;
    followingCount: number;
}

interface ProfileCardProps {
    profileData: ProfileData;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profileData }) => {
  return (
    <Card sx={{ maxWidth: 345, backgroundColor: 'background.default',  borderRadius: '16px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingY: 2 }}>
        <CustomAvatar name={profileData.name} />
        <Typography gutterBottom variant="h5" component="div">
          {profileData.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          @{profileData.name.toLowerCase().split(' ').join('')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 0.5 }}>
          <FmdGoodOutlinedIcon color="action"  />
          <Typography variant="body2" color="text.secondary">
            {profileData.location}
          </Typography>
        </Box>
      </Box>
      <CardContent>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {profileData.tagLine}
        </Typography>
        <Grid container spacing={2} sx={{ marginTop: 2, justifyContent: 'center' }}>
          <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Tweets
            </Typography>
            <Typography variant="subtitle1" color="text.primary">
              {profileData.tweetCount}
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Followers
            </Typography>
            <Typography variant="subtitle1" color="text.primary">
              {profileData.followerCount}
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Following
            </Typography>
            <Typography variant="subtitle1" color="text.primary">
              {profileData.followingCount}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
