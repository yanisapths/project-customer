import React from 'react'
import { ArrowLeftIcon } from  '@heroicons/react/solid';
import Link from "next/Link";

function CommonTab({goBack}) {
  return (
    <nav className="flex text-sm font-medium border-b border-gray-100 lg:max-w-xl">
      <Link href={goBack}>
        <ArrowLeftIcon className="rounded-full w-8 h-8 mb-8 cursor-pointer" />
      </Link>
    </nav>
  )
}

export default CommonTab