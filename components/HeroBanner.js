import React from 'react'

function HeroBanner() {
  return (
    <div className="mx-auto max-w-3xl text-center lg:mt-24 my-10 xl:my-28">
    <h1 className="text-3xl font-extrabold text-[#005844] lg:text-5xl">
      {" "}
      A platform
      <span className="text-[#7BC6B7]"> "Olive" </span> that brings
      together
    </h1>

    <p className="mx-auto mt-4 max-w-xl px-8 lg:px-0 caption lg:text-xl sm:leading-relaxed">
      The easiest way to access new customers and physical therapists
    </p>
  </div>
  )
}

export default HeroBanner