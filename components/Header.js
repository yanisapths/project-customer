import React from 'react'
import Image from 'next/image';
import {SearchIcon} from '@heroicons/react/solid';
export default function Header() {
  return (
   <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
       {/* Left */}
       <div className="relative flex items-center h-12 cursor-pointer my-auto">
           <Image  src="/olivelogo.png" 
           layout="fill"
           objectFit="contain"
           objectPosition="left"
           />
       </div>

       {/* Middle */}
       <div>
           <input type="text" placeholder="Search daycare"/>
           <SearchIcon className="h-8 bg-teal-500 text-white rounded-full p-2 cursor-pointer"/>
       </div>

       {/* Right */}
       <div></div>
   </header>
  )
}
