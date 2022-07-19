import React from 'react'
import Link from 'next/Link'

function Banner({ bid }) {
  return (
    <section class=" max-w-screen bg-white">
  <div class="relative px-12 py-20 mx-auto lg:items-center lg:flex">
    <div class="max-w-xl text-center sm:text-left">
      <h1 class="text-3xl font-extrabold sm:text-5xl">
        Give Care
        <strong class="font-extrabold text-fuchsia-400 sm:block">
         today.
        </strong>
      </h1>

      <p class="max-w-lg mt-4 sm:leading-relaxed sm:text-xl">
        Tell the world about your place!
      </p>

      <div class="flex flex-wrap gap-4 mt-8 text-center">
        <Link href={`/daycares/become/${encodeURIComponent({bid})}`}>
            <a class="block w-full px-12 py-3 text-sm font-medium text-white rounded shadow bg-fuchsia-600 sm:w-auto active:bg-violet-500 hover:bg-fuchsia-700 focus:outline-none focus:ring" >
            Complete daycare info
            </a>
        </Link>
      </div>
    </div>
  </div>
</section>
  )
}

export default Banner