import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';


const StyledList = styled(List)(({ theme }) => ({
  width: '80%',
  backgroundColor: theme.palette.background.paper,
  color: 'red',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  paddingLeft: theme.spacing(4),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '& .MuiListItemIcon-root': {
    color: 'inherit',
  },
}));

const SidebarComponent = () => {
  const navigate = useNavigate();

    return (
      <StyledList>
        {/* Home */}
        <StyledListItem onClick={()=> navigate('/')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </StyledListItem>
  
        {/* Profile */}
        <StyledListItem onClick={()=> navigate('/profile')}>
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </StyledListItem>
  
        {/* Search */}
        <StyledListItem onClick={()=> navigate('/search')}>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Search" />
        </StyledListItem>
      </StyledList>
    );
  };
  
  export default SidebarComponent;