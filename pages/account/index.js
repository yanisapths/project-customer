import React from 'react'
import Head from "next/head";
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Tabs from './Tabs'

function Layout({ children }) {
  return (
    <React.Fragment>
          <div className="h-screen bg-teal-50">
    <Head>
        <title>Olive | Family </title>
        <link rel="icon" href="favicon.ico" />
    </Head>
    <Header />
    <Tabs />
       <div className="bg-white px-8 xs:mx-4 xs:py-60  min-w-md  mx-auto  rounded-xl shadow-xl">
       asdd
      </div>
    <Footer />
    </div>
    </React.Fragment>
  )
}

export default Layout