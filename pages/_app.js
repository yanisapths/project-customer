import React from "react";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Router from "next/router";
import { SessionProvider } from "next-auth/react";
import ProgressBar from "@badrap/bar-of-progress";
import { Toaster } from "react-hot-toast";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Head from "next/head";

// Material Kit 2 React themes
import theme from "../theme";

const progress = new ProgressBar({
  size: 5,
  color: "#7BC6B7",
  className: "z-50",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <Head>
            <style>
              @import
              url(`&#39;`https://fonts.googleapis.com/css2?family=Mitr&display=swap`&#39;`);
            </style>
          </Head>
          <Toaster />
          <Component {...pageProps} />
        </ThemeProvider>
      </LocalizationProvider>
    </SessionProvider>
  );
}

export default MyApp;
