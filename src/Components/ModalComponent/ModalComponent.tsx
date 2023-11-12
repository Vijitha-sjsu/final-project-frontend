import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid'; 

const colors = {
  feather: '#77C9D4',
  marine: '#57BC90',
  forest: '#015249',
  sleekGrey: '#A5A5AF', 
  white: '#FFFFFF'
};

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { firstName: string, lastName: string, username: string, location: string, tagline: string }) => void;
  errorMessage: string;
}

const ModalComponent: React.FC<ModalProps> = ({ open, onClose, onSave, errorMessage }) => {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    username: '',
    location: '',
    tagline: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formValues);
  };

  return (
    <Modal open={open} onClose={onClose} disableEscapeKeyDown={true} BackdropProps={{
      onClick: (event) => event.stopPropagation() 
    }}>
      <Box sx={{
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: 400, 
        boxShadow: 24, 
        bgcolor: 'white',
        p: 4,
        borderRadius: 2, 
        border: `5px solid ${colors.marine}`, 
      }}>
        {errorMessage && (
  <Typography color="error">{errorMessage}</Typography>
)}
        <Typography variant="h6" style={{ color: colors.forest, marginBottom: 8 }}>Set Sail on Travel Tales!</Typography>
        <Typography variant="caption" style={{ color: colors.forest, marginBottom: 16 }}>Create Your Explorer Profile</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField required fullWidth label="First Name" name="firstName" value={formValues.firstName} onChange={handleInputChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField required fullWidth label="Last Name" name="lastName" value={formValues.lastName} onChange={handleInputChange} />
          </Grid>
        </Grid>
        <TextField required fullWidth label="Username" name="username" value={formValues.username} onChange={handleInputChange} margin="normal" />
        <TextField required fullWidth label="Location" name="location" value={formValues.location} onChange={handleInputChange} margin="normal" />
        <TextField required fullWidth label="Tag Line" name="tagline" value={formValues.tagline} onChange={handleInputChange} margin="normal" inputProps={{ maxLength: 100 }} helperText={`${formValues.tagline.length}/100`} />
        <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2, bgcolor: colors.marine, color: colors.white, '&:hover': {bgcolor: colors.forest} }}>Save</Button>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
