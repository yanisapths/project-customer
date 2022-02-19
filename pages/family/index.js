import { useState, useEffect } from "react";
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import {
    PlusCircleIcon,
} from '@heroicons/react/solid';
import AddFamily from '../../components/AddFamily'
import {useSession, getSession} from "next-auth/react";
import  signIn from "../auth/signin"

function Family(){ 
    const {data: session,status} = useSession();
        
    if (status === "loading") {
        return <p>Loading...</p>
      }
    
      if (status === "unauthenticated") {
        return (
            <div className="h-screen bg-teal-50">
            <Header/>
              <main className="main">
                  <section className="flex-grow pt-14 px-6 ">
                      <h1 className=" text-3xl font-semibold mt-2 mb-6 text-teal-900 ">สมาชิกในครอบครัว</h1>
                      <div className="้hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                          <p className="button flex bg-white">You need to signin 
                              <PlusCircleIcon className="w-6 h-6 mt-1"/>
                          </p>
                      </div>
                  </section>
              </main>
              <Footer />
        </div>
        )
      }
      else{

          return (
            <div className="h-screen bg-teal-50">
                <Header/>
                  <main className="main">
                      <section className="flex-grow pt-14 px-6 ">
                          <h1 className=" text-3xl font-semibold mt-2 mb-6 text-teal-900 ">สมาชิกในครอบครัว</h1>
                          <div className="้hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                              <p className="button flex bg-white">เพิ่ม
                                  <PlusCircleIcon className="w-6 h-6 mt-1"/>
                              </p>
                          </div>
                      </section>
                  </main>
                  <Footer />
            </div>
        )
      }
}

export default Family;



