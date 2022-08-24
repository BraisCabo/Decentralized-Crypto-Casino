import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';




export default function CustomColor({backGround, text, display, more, size, type, width, functionallity}) {
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
      <Button size={size} type={type} color="neutral"  variant='contained' sx={{width:{width}}} onClick={functionallity}>
          {display}
      </Button>
    </ThemeProvider>
  );
}