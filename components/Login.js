import React from 'react'
import Image from "next/image";
import {signIn} from "next-auth/react"

function Login() {
  return (
    <div>
        <Image
        src="/Avatar.png"
        height={400}
        width={400}
        objectFit="contain"
        />
        <h1
            onClick={signIn}
            className="p-5  rounded-full text-center cursor-pointer"
        >
            Login with Facebook         
        </h1>
    </div>
  )
}

export default Login