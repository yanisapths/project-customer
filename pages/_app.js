import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import Router,{useRouter} from "next/router";
import { SessionProvider } from "next-auth/react"
import {
  ClerkProvider,
} from "@clerk/nextjs"
import ProgressBar from "@badrap/bar-of-progress";
import signIn from './auth/signin';

const progress = new ProgressBar({
    size:5,
    color:"#7BC6B7",
    className:"z-50",
    delay: 100,
});

const publicPages=["/"];


Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ 
  Component, 
  pageProps: { session, ...pageProps },
 }) {

  return (
    <SessionProvider session={session}>
          <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
