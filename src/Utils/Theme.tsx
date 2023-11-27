import { createTheme } from '@mui/material/styles';

const defaultColors = {
  feather: '#77C9D4',
  marine: '#57BC90',
  forest: '#015249',
  sleekGrey: '#A5A5AF',
  white: '#FFFFFF'
};

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
  palette: {
    primary: {
      main: defaultColors.forest,
      contrastText: defaultColors.white,
    },
    secondary: {
      main: defaultColors.feather,
      contrastText: defaultColors.white,
    },
  } 
});

export default theme;