import React from 'react'
import { ArrowLeftIcon } from  '@heroicons/react/solid';
import router from "next/router"
const goBack = () => {
    router.push("/locations/");
  };

function Tab() {
  return (
    <nav class="flex text-sm font-medium border-b border-gray-100 lg:max-w-xl">
        <ArrowLeftIcon onClick={goBack} href="" class="text-teal-500  rounded-full w-8 h-8 mb-8 cursor-pointer" />
    </nav>
  )
}

export default Tab