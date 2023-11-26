import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoImage from '../../Images/travel tales.jpeg';

const SidebarComponent = ({ isAdmin, initialTab }) => {
  const navigate = useNavigate();
  const { logout } = useAuth0();
  const [value, setValue] = React.useState(initialTab);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/home');
        break;
      case 1:
        navigate('/profile');
        break;
      case 2:
        navigate('/search');
        break;
      case 3:
        navigate('/admin');
        break;
      default:
        break;
    }
  };

  return (
    <Box>
      <img src={LogoImage} alt="Travel Tales Logo" style={{ width: '100%', marginBottom: 20 }} />
      <Tabs
      orientation="vertical"
      value={value}
      onChange={handleChange}
      aria-label="Sidebar tabs"
    >
      <Tab icon={<HomeIcon />} iconPosition="start" label="Home" />
      <Tab icon={<AccountBoxIcon />} iconPosition="start" label="Profile" />
      <Tab icon={<SearchIcon />} iconPosition="start" label="Search" />
      {isAdmin && (
        <Tab icon={<AdminPanelSettingsIcon/>} iconPosition="start" label="Admin Dashboard" />
      )}
      <Tab icon={<LogoutIcon />} iconPosition="start" label="Logout" onClick={() => logout({ returnTo: window.location.origin })} />
      </Tabs>
    </Box>
  );
};

export default SidebarComponent;
