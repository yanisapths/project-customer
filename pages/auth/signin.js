import {getProviders, signIn as SignIntoProvider} from "next-auth/react";
import React from 'react'
import Image from "next/image";
import Header from '../../components/Header'
import FooterSocial from '../../components/FooterSocial'
import  BtnLogin from '../../components/BtnLogin';
import Link from "next/link"

function signIn({ providers }) {
  return (
    <div>
    {/* <Header /> */}
      <main className="justify-items-center">
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8 mt-20 md:mt-30">
        <div className="max-w-lg mx-auto text-center ">
          <h1 className="md:text-5xl font-bold text-3xl font-mono">เข้าสู่ระบบ🧓🏼</h1>

          <p className="mt-4 text-gray-800 fonts-mono text-lg md:text-2xl md:mt-5">
              แหล่งรวมศูนย์ดูแลเพื่อคนที่คุณรัก
          </p>
        </div>
          <div  className="mt-8 mb-0 space-y-4">
                 
                  <div className="flex justify-center">
                        <div  className="flex rounded-full bg-gradient-to-r from-red-500 via-orange-300 to-pink-200 hover:text-white active:text-opacity-75 focus:outline-none focus:ring shadow-gray-200 shadow-xl">
                        <BtnLogin  provider={providers.google} />
                          <Image src="https://www.pngplay.com/wp-content/uploads/13/Google-Logo-PNG-Photo-Image.png"  
                                width={95}
                                height={90} 
                                objectFit="fill"
                                className="w-8"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div  className="flex rounded-full bg-gradient-to-r from-blue-500 via-blue-300 to-emerald-200 hover:text-white active:text-opacity-75 focus:outline-none focus:ring shadow-gray-200 shadow-xl">
                        <BtnLogin  provider={providers.facebook} />
                          <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png"  
                                width={90}
                                height={90} 
                                objectFit="fill"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div  className="flex rounded-full bg-gradient-to-r from-green-500 via-lime-400 to-time-200 hover:text-white active:text-opacity-75 focus:outline-none focus:ring shadow-gray-200 shadow-xl">
                        <BtnLogin  provider={providers.line} />
                          <Image src="/line.png"  
                                width={90}
                                height={90} 
                                objectFit="fill"
                            />
                        </div>
                    </div>
                 
          </div>
          <div  className="mt-16 mb-0 space-y-4 border-t  border-black/25 pt-12 ">
                <div className="flex justify-center">
                    <btn className="inline-flex px-6 py-2  md:px-8 md:py-3 rounded-full hover:bg-transparent active:bg-transparent 
                    bg-orange-400 hover:border-2  hover:border-orange-300 group focus:outline-none focus:ring shadow-gray-200 shadow-xl active:text-orange-400 hover:text-orange-400 text-white "
                        onClick={() => {
                          window.open("https://olivedaycare.vercel.app", "_blank");
                        }}
                    >
                        <span className="px-2 py-3  md:px-4 md:py-5  md:text-xl text-md font-extrabold hover:text-orange-400 active:text-orange-400 ">
                            ผู้ประกอบการศูนย์ดูแล
                        </span>                         
                      <span className="flex-shrink-0 p-3  md:p-6 md:ml-4 group text-white group bg-orange-300  border border-current rounded-full group-active:text-orange-400 group-hover:bg-white group-hover:text-orange-400">
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
