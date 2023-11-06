import React, { useState } from 'react';
import { Box, Tab, Tabs, Grid, Typography } from '@mui/material';
import SidebarComponent from '../../Components/SidebarComponent/SidebarComponent.tsx'
import CustomAvatar from '../../Components/AvatarComponent/AvatarComponent.tsx';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import format from "date-fns/format";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function ProfileHeader({ profileData }) {
  return (
    <Box>
        <Box
        sx={{
            position: 'relative',
            p: 25,
            background: 'url(data:image/jpeg;base64,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)',
            backgroundSize: 'cover',
            color: 'white',
            marginBottom: -13
        }}
        >
        </Box>
        <Box sx={{marginLeft: 3}}>
            <CustomAvatar name={profileData.name} size={200}/>
        </Box>
        <Typography variant="h4" sx={{ pt: 3 }}>
            {profileData.name}
        </Typography>
        <Typography variant="subtitle1">
            {profileData.tagLine}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 0.5, color: 'gray' }}>
            <CalendarMonthOutlinedIcon fontSize='small' sx={{marginRight:1}}></CalendarMonthOutlinedIcon>
            <Typography variant="subtitle1">
                Joined {format(new Date(profileData.joinDate), "MMMM y")}
            </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1" sx={{ color: 'black', mr: 0.5 }}>
            {profileData.followingCount}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'gray', mr: 4 }}>
            Following
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'black', mr: 0.5 }}>
            {profileData.followerCount}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'gray' }}>
            Followers
            </Typography>
      </Box>
  </Box>
  );
}

export default function ProfilePage({ profileData }) {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <SidebarComponent />
        </Grid>
        <Grid item xs={9}>
          <ProfileHeader profileData={profileData} />
          <Box sx={{ mt: 3 }}>
            <Tabs value={tabValue} onChange={handleTabChange} centered>
              <Tab label="Posts" />
              <Tab label="Followers" />
              <Tab label="Following" />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
              {/* Content for Posts Tab */}
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              {/* Content for Followers Tab */}
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              {/* Content for Following Tab */}
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
