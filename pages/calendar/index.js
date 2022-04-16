import Head from "next/head";
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import {useSession, getSession} from "next-auth/react";
import FooterSocial from '../../components/FooterSocial'
import Link from "next/link"

function Calendar(){ 
    const {data: session,status} = useSession();

    if (status === "loading") {
        return <p>Loading...</p>
      }
    
      if (status === "unauthenticated") {
        return (
            <div className="h-screen bg-teal-50">
                <Head>
                    <title>Olive | Family </title>
                    <link rel="icon" href="favicon.ico" />
                </Head>
            <Header/>
              <main className="main">
                  <section className="flex max-w-screen-xl px-4 py-10  mx-auto  lg:items-center lg:flex">
                             <div className="max-w-xl text-center sm:text-left ">
                                 <h1 className="mt-5 mb-2   text-3xl font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">ตารางนัด</h1>
                                        <h1 className="mt-5 mb-2   text-3xl font-extrabold text-black sm:text-5xl bg-clip-text">
                                            Coming Soon
                                        </h1>
                                        <p className="max-w-lg mt-4 sm:leading-relaxed sm:text-xl">
                                            This feature is under construction.
                                        </p>
                                <div  className="md:mt-16 mt-8  mb-0 space-y-4 border-t  border-black/25 md:pt-12 pt-8 ">
                                    <Link href="/auth/signin">
                                            <a  className=" mt-4 inline-block px-8 py-5  md:px-20 md:py-8 md:font-extrabold md:text-2xl  text-lg font-medium text-white transition bg-indigo-600 rounded hover:scale-110 hover:shadow-xl active:bg-indigo-500 focus:outline-none focus:ring" >เข้าสู่ระบบ</a>
                                    </Link>
                                </div>
                            </div>
                  </section>
              </main>
              <Footer />
        </div>
        )
      }
      else{

          return (
            <div >
                <Head>
                    <title>Olive | Calendar </title>
                    <link rel="icon" href="favicon.ico" />
                </Head>
                <Header/>
                  <main className="main bg-teal-50 md:h-screen xl:h-screen md:py-28i">
                      <section className="flex-grow md:pt-30 pt-10 ">
                      <h1 className="mt-5 mb-2   text-3xl font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">ตารางนัด</h1>
                            <h1 className="mt-5 mb-2   text-3xl font-extrabold text-black sm:text-5xl bg-clip-text">
                                Coming Soon
                            </h1>
                            <p className="max-w-lg mt-4 sm:leading-relaxed sm:text-xl">
                                This feature is under construction.
                            </p>
                      </section>
                  <FooterSocial />
                  </main>
                  <Footer />
            </div>
        )
      }
}

export default Calendar;



