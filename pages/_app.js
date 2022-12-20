import React from 'react';
import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import Router from "next/router";
import { SessionProvider } from "next-auth/react"
import ProgressBar from "@badrap/bar-of-progress";
import { Toaster } from "react-hot-toast";
import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'

// @mui material components
import { ThemeProvider } from "@mui/material/styles";

// Material Kit 2 React themes
import theme from "../theme";

const progress = new ProgressBar({
    size:5,
    color:"#7BC6B7",
    className:"z-50",
    delay: 100,
});


Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on("routeChangeError", progress.finish);



function MyApp({ 
  Component, 
  pageProps: { session, ...pageProps },
 }) {

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
         <Toaster />
          <Component {...pageProps} />
       </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp
