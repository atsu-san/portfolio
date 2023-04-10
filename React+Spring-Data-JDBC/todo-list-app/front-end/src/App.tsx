import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TodoList from "./features/TodoList";
import AtomSnackbar from "./atomic/atoms/AtomSnackbar";
import { ThemeProvider, createTheme } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: blueGrey[500],
      },
    },
    typography: {
      h1: {
        fontSize: "3rem",
      },
      h2: {
        fontSize: "2.5rem",
      },
      h3: {
        fontSize: "2rem",
      },
      h4: {
        fontSize: "1.75rem",
      },
      h5: {
        fontSize: "1.5rem",
      },
      h6: {
        fontSize: "1.25rem",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="App">
          <AtomSnackbar />
          <TodoList />
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
