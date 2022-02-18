import React from 'react'
import Image from "next/image";
import {signIn} from "next-auth/react"
import Header from './Header'
import Footer from './Footer'

function Login() {
  return (
    <div>
      <Header />
        <main className="justify-items-center">
        <div className="mt-15 p-20">
          <p className="text-md text-gray-500 mt-4 text-center pb-5">เข้าสู่ระบบเพื่อใช้งาน</p>     
                <btn className="block p-[2px] rounded-full bg-gradient-to-r from-blue-400 to-emerald-400 hover:text-white active:text-opacity-75 focus:outline-none focus:ring" onClick={signIn}>
                    <span className="block px-8 py-3 text-center text-sm font-medium bg-white rounded-full hover:bg-transparent">
                       เข้าสู่ระบบ
                    </span>
                </btn>
        </div>
        </main>
      <Footer />
    </div>
  )
}

export default Login