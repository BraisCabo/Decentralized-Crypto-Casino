import { TextField } from "@mui/material";
import styled from "@emotion/styled";

 export const CustomTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#FFFFFF',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#FFFFFF',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#FFFFFF',
      },
      '&:hover fieldset': {
        borderColor: '#FFFFFF',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#FFFFFF',
      },
      "&.MuiInputBase-root": {
        color: 'white'
    }
    },
  });
