import React, { useMemo, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";

import App from "../src/App"
import { AuthProvider } from './context/AuthContext';
import "./index.css"


// ========= Migrate to Shadcn and Tailwind =========
// import './styles/index.scss'
// import { CssBaseline, ThemeProvider } from "@mui/material";
// import createAppTheme from './themes';
// import { ThemeProviderCustom } from './context/ThemeContext';
// import 'bootstrap/dist/css/bootstrap.min.css'
// import '@mdi/font/css/materialdesignicons.min.css';


const Root = () => {
  const basename = import.meta.env.DEV ? "/chlora" : "/chlora"
  const [mode, setMode] = useState("light");

  // ========= Migrate to Shadcn and Tailwind =========
  // const theme = useMemo(() =>
  //   createAppTheme(mode),
  //   [mode]);

  const toggleTheme = () => {
    setMode(prev => (prev === "dark" ? "light" : "dark"));
    document.documentElement.classList.toggle("dark");
  }

  return (
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <div className={mode}>
          <App toggleTheme={toggleTheme} />
        </div>

        {/* // ========= Migrate to Shadcn and Tailwind ========= */}
        {/* <ThemeProviderCustom>
          {(theme) => (
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <App />
            </ThemeProvider>
          )}
        </ThemeProviderCustom> */}
        {/* // ========= Migrate to Shadcn and Tailwind ========= */}

      </AuthProvider>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);  