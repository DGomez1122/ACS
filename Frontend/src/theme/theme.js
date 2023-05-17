import { createTheme, styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { inputLabelClasses } from "@mui/material/InputLabel";

const theme = createTheme({
  // grey 4d4e4e
  // blue 10467a
  // secundary #6b778c
  palette: {
    background: {
      default: "#2C2C2C",
      paper: "#2C2C2C",
    },
    primary: {
      contrastText: "#ffffff",
      main: "#6750A4",
    },
    secondary: {
      contrastText: "#ffffff",
      main: "#A394FF",
    },
    text: {
      primary: "#ffffff",
      secondary: "#A394FF",
    },
  },
});

export const StyledTextField = styled(TextField)({
  [`& .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: "#BB86FC",
  },
  [`&:hover .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]:
    {
      borderColor: "#A394FF",
    },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
    {
      borderColor: "#BB86FC",
    },
  [`& .${inputLabelClasses.outlined}.${inputLabelClasses.focused}`]: {
    color: "#BB86FC",
  },
});

export default theme;

// {
//   lunes: [
//     { startTime: '10:00', endTime: '11:00' },
//     { startTime: '17:00', endTime: '20:00' },
//     }
//   ],
//   martes: [
//     { startTime: '10:00', endTime: '11:00' },
//     { startTime: '17:00', endTime: '20:00' },
//     }
//   ],
//   miercoles: []
// }

// <div>

// </div>
