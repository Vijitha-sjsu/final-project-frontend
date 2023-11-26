import React from 'react';
import { Tabs, Tab } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const SidebarComponent = ({ isAdmin }) => {
  const navigate = useNavigate();
  const { logout } = useAuth0();
  const [value, setValue] = React.useState(0);

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
    <Tabs
      orientation="vertical"
      value={value}
      onChange={handleChange}
      aria-label="Sidebar tabs"
    >
      <Tab icon={<HomeIcon />} label="Home" />
      <Tab icon={<AccountBoxIcon />} label="Profile" />
      <Tab icon={<SearchIcon />} label="Search" />
      {isAdmin && (
        <Tab icon={<AdminPanelSettingsIcon/>} label="Admin Dashboard" />
      )}
      <Tab icon={<LogoutIcon />} label="Logout" onClick={() => logout({ returnTo: window.location.origin })} />
    </Tabs>
  );
};

export default SidebarComponent;
