import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

export default function CustomButton({backGround, text, display, size, type, width, functionallity, margin, height}) {
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
      <Button size={size} type={type} color="neutral"  variant='contained' sx={{width:{width}, height:{height}, m: margin}} onClick={functionallity}>
          {display}
      </Button>
    </ThemeProvider>
  );
}