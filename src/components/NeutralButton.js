import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import {Grid, TextField, Box} from '@mui/material';




export default function CustomColor({backGround, text, display, more, size, type, width}) {
    const theme = createTheme({
        palette: {
          neutral: {
            main: backGround,
            contrastText: text,
          },
        },
      });
  return (
    <ThemeProvider theme={theme}>
      <Button size={size} type={type} color="neutral"  variant='contained' sx={{width:{width}}}>
          {display}
      </Button>
    </ThemeProvider>
  );
}