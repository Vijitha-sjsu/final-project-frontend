import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { UserDataProvider } from './Contexts/UserDataContext.tsx';

const theme = createTheme({
  typography: {
    fontFamily: 'Nunito, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {
          '@font-face': {
            fontFamily: 'Nunito',
            src: `url(https://fonts.googleapis.com/css?family=Nunito:300,400,700&display=swap)`,
          },
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <UserDataProvider>
          <Auth0Provider domain="dev-75uroj1rczuev8rq.us.auth0.com" clientId="gghNQgPc8qmARgHvkrvoDKsWv1PqFwaK" authorizationParams={{redirect_uri: window.location.origin}}>
            <App />
          </Auth0Provider>
        </UserDataProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
