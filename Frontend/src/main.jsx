import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {  createTheme, ThemeProvider } from "@mui/material";
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from "./context/Auth_context.jsx";
import {Toaster} from 'react-hot-toast'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/api/v1'
axios.defaults.withCredentials = true;


const theme = createTheme({
  typography: "Ronoto slab , serif",
  allVariants: { color: "white" },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Toaster position="top-center"/> 
    <App /> 
    </ThemeProvider>
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
