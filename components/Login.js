import React from 'react'
import Image from "next/image";
import {signIn} from "next-auth/react"
import Header from './Header'
import FooterSocial from './FooterSocial'
import {getSession} from "next-auth/react"

function Login() {
 
  return (
    <div>
      {/* <Header /> */}
        <main className="justify-items-center">
        <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8 mt-20 md:mt-40">
          <div className="max-w-lg mx-auto text-center ">
            <h1 className="md:text-5xl font-bold text-3xl font-mono">เข้าสู่ระบบ🧓🏼</h1>

            <p class="mt-4 text-gray-800 fonts-mono text-lg md:text-2xl md:mt-5">
                แหล่งรวมศูนย์ดูแลเพื่อคนที่คุณรัก
            </p>
          </div>
            <div  className="mt-8 mb-0 space-y-4">
                <btn className="block p-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-emerald-200 hover:text-white active:text-opacity-75 focus:outline-none focus:ring shadow-gray-200 shadow-xl " onClick={signIn}>
                    <span className="text-xl block px-8 py-8 text-center  font-extrabold bg-white rounded-full hover:bg-transparent ">
                         ผู้ใช้ทั่วไป
                    </span>
                </btn>
            </div>
            <div  className="mt-8 mb-0 space-y-4">
                <btn className="block p-[2px] rounded-full bg-gradient-to-r from-indigo-300 to-fuchsia-400 hover:text-white active:text-opacity-75 focus:outline-none focus:ring shadow-gray-200 shadow-xl " onClick={signIn}>
                    <span className="text-xl block px-8 py-8 text-center  font-extrabold bg-white rounded-full hover:bg-transparent ">
                        ผู้ประกอบการศูนย์ดูแล
                    </span>
                </btn>
            </div>
        </div>
        </main>
        <FooterSocial />

    </div>
  )
}

export default Login