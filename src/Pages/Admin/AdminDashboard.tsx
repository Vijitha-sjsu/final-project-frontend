import React, { useState } from 'react';
import { Tabs, Tab, Box, Grid, Typography, Link } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SidebarComponent from '../../Components/SidebarComponent/SidebarComponent.tsx';
import AdminPostModeration from '../../Components/AdminComponent/AdminPostModeration.tsx';

const AdminDashboard = () => {

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const renderTabContent = () => {
    switch (tabValue) {
      case 0:
        return <AdminPostModeration />;
      case 1:
        return <UserModerationTab/>;
      default:
        return null;
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <SidebarComponent initialTab={3} isAdmin={true} />
          </Grid>
          <Grid item xs={9} sx={{ height: 'calc(100vh)', overflowY: 'auto' }}>
            <Box sx={{ padding: 2 }}>
              
              {/* Tabs for switching between different sections */}
              <Tabs value={tabValue} onChange={handleTabChange} centered>
                <Tab label="Content Moderation" />
                <Tab label="User Moderation" />
              </Tabs>

              {/* Render the content based on the selected tab */}
              {renderTabContent()}

            </Box>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

const UserModerationTab = () => {
  return (
    <Box sx={{ 
      padding: 2, 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      flexDirection: 'column', 
      height: '100%' 
    }}>
      <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
        User Management
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center' }}>
        Please visit the {' '}
        <Link href="https://manage.auth0.com/dashboard/us/dev-75uroj1rczuev8rq/users" target="_blank" rel="noopener noreferrer">
          Auth0 User Management Dashboard
        </Link>
        {' '} to manage user accounts,  including actions such as blocking or deleting.
      </Typography>
    </Box>
  );
};

export default AdminDashboard;
