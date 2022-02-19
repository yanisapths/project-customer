import React from 'react'
import { signIn as SignIntoProvider } from 'next-auth/react'
import Image from "next/image"

const btnLogin=({provider}) =>  {
  return (
    <div className="">
        <btn className="block p-[1px] md:p-[2px] md:w-80  mr-4 w-40 h-20  rounded-full bg-transparent hover:text-white active:text-opacity-75 focus:outline-none focus:ring" 
           onClick={() => SignIntoProvider(provider.id, {callbackUrl: '/'} )}
        >
            <span className="text-md block px-2 py-5 md:px-8 md:py-7  md:text-lg text-center  font-extrabold bg-white rounded-full hover:bg-transparent ">
                 ลงชื่อเข้าใช้ด้วย {provider.name}  
            </span>
         </btn>
        
    </div>
  )
}
export default btnLogin