import {getProviders, signIn as SignIntoProvider} from "next-auth/react";
import React from 'react'
import Image from "next/image";
import Header from '../../components/Header'
import FooterSocial from '../../components/FooterSocial'
import  BtnLogin from '../../components/BtnLogin';
import Link from "next/link"
import Head from "next/head";

function signIn({ providers }) {
  return (
    <div>
    {/* <Header /> */}
    <Head>
        <title>Olive | SignIn </title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      {/* main */}
      <main className="justify-items-center">
      <div className="max-w-screen-xl px-4 py-4 mx-auto sm:px-6 lg:px-8 mt-20 md:mt-30">
        <div className="max-w-lg mx-auto text-center ">
          <h1 className="md:text-5xl font-bold text-3xl font-mono">เข้าสู่ระบบ🧓🏼</h1>

          <p className="mt-4 text-gray-800 fonts-mono text-lg md:text-2xl md:mt-5">
              แหล่งรวมศูนย์ดูแลเพื่อคนที่คุณรัก
          </p>
        </div>
          <div  className="mt-8 mb-0 space-y-4">
                 
                  <div className="flex justify-center">
                        <div  className="flex  md:pr-4  sm:pr-8 rounded-full bg-gradient-to-r from-orange-50 via-red-100 to-pink-100 hover:text-red-600 active:text-opacity-75 focus:outline-none focus:ring shadow-gray-200 shadow-xl">
                        <BtnLogin  provider={providers.google} />
                        <Image src="/google.png" width="60%" height={5} objectFit="contain"/>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div  className="flex  md:pr-4 sm:pr-8  rounded-full bg-gradient-to-r from-teal-50 via-blue-100 to-sky-100 hover:text-blue-600 active:text-opacity-75 focus:outline-none focus:ring shadow-gray-200 shadow-xl">
                        <BtnLogin  provider={providers.facebook} />
                        <Image src="/facebook.png" width="60%" height={5} objectFit="contain"/>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div  className="flex  md:pr-4  sm:pr-8  rounded-full bg-gradient-to-r from-green-50 via-green-100 to-teal-100 hover:text-emerald-600 active:text-opacity-75 focus:outline-none focus:ring shadow-gray-200 shadow-xl">
                        <BtnLogin  provider={providers.line} />
                        <Image src="/line.png" width="60%" height={5} objectFit="contain"/>
                        </div>
                    </div>
                 
          </div>
          <div  className="mt-16 mb-0 space-y-4 border-t  border-black/25 pt-12 ">
                <div className="flex justify-center">
                    <btn className="inline-flex px-6 py-2  md:px-8 md:py-3 rounded-full hover:bg-transparent active:bg-transparent 
                    bg-yellow-50 hover:border-2  hover:border-yellow-300 group focus:outline-none focus:ring shadow-gray-200 shadow-xl active:text-yellow-500 hover:text-yellow-500 text-yellow-600"
                        onClick={() => {
                          window.open("https://olivedaycare.vercel.app", "_blank");
                        }}
                    >
                        <span className="px-2 py-3  md:px-4 md:py-5  md:text-xl text-md font-extrabold hover:text-yellow-500 active:text-yellow-500 ">
                            ผู้ประกอบการศูนย์ดูแล
                        </span>                         
                      <span className="flex-shrink-0 p-3  md:p-6 md:ml-4 group text-yellow-600 group bg-yellow-200  border border-current rounded-full group-active:text-yellow-400 group-hover:bg-white group-hover:text-yellow-400">
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </btn>
                  </div>
          </div>
          
      </div>
      </main>
   
  </div>
  )
}

export async function getServerSideProps() {
    const providers = await getProviders()
    return {
        props: {
            providers
        }
      }
}
export default signIn
