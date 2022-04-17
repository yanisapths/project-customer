import React from 'react'
import Head from "next/head";
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Image from "next/image"
import Link from "next/link"
import { routes } from "../../components/data/routes";

function Locations() {
    const path = routes;

  return (
      <div className="h-screen bg-[#7BC6B7]">
              <Head>
                    <title>Olive | Locations </title>
                    <link rel="icon" href="favicon.ico" />
                </Head>
                <Header/>
                <main className="font-noto py-6 px-6 sm:p-8 md:py-10 md:px-8 h-screen overflow-hidden bg-[#7BC6B7] font-poppins" >
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:items-center md:text-center ">
                        <h1 className="mt-6 text-4xl font-bold text-white md:text-7xl md:mt-20 ">จังหวัด</h1>
                    </div>

                    {/* locations */}
                    <section>
                        <div className="mt-12 md:mt-28">
                             <h1 className="font-semibold  text-xl mb-4 md:text-center md:text-4xl md:font-semibold md:mb-12 text-[#005844]">ภาคเหนือ</h1>
                                <div  className="-mt-4  mb-10 space-y-4 border-t  border-[#005844]  md:pt-8"></div>
                                    {path.map(( {name , link } ) => (
                                    <div key={link} >
                                        <Link href={link}>
                                            <h1 className="font-semibold  text-2xl mb-4 md:text-center md:text-5xl md:font-semibold md:mb-12 cursor-pointer hover:text-[#005844] text-white">{name}</h1>
                                        </Link>
                                    </div>
                                    ))}

                        </div>
                    </section>
            </main>
        <Footer />
  </div>
  )
}

export default Locations