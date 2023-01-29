import { getProviders, signIn as SignIntoProvider } from "next-auth/react";
import React from "react";
import Image from "next/image";
import BtnLogin from "../../components/BtnLogin";
import Head from "next/head";
import Link from "next/link";

function signIn({ providers }) {
  return (
    <div>
      {/* <Header /> */}
      <Head>
        <title>Olive | SignIn </title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      {/* main */}
      <div className="mx-auto py-32 h-screen bg-cover overflow-hidden justify-center items-center align-middle bg-[#005844]">
        <div className="text-center mx-4 xl:mx-auto max-w-xl py-20 bg-white backdrop-blur-sm drop-shadow-lg rounded-xl">
          <div className="">
            <Link href="/">
              <Image
                src="/asset/logo.png"
                width="100"
                height="120"
                alt="/Avatar.png"
                className="cursor-pointer"
              />
            </Link>
            <p className="md:text-4xl font-bold text-3xl font-mono ">Welcome</p>

            <p className="mt-4 text-gray-800 fonts-mono text-lg md:text-2xl md:mt-5">
              Login to continue to Olive
            </p>
          </div>
          <div className="mt-8 mb-0 space-y-6 md:space-y-8">
            <div className="flex justify-center">
              <div className="flex cursor-pointer rounded-full bg-gradient-to-r from-orange-50 via-red-100 to-pink-100 hover:text-red-600 active:text-opacity-75 focus:outline-none focus:ring shadow-gray-200 shadow-xl">
                <BtnLogin provider={providers.google} />
                <Image
                  src="/google.png"
                  alt="/Avatar.png"
                  width={60}
                  height={10}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex cursor-pointer rounded-full bg-gradient-to-r from-teal-50 via-blue-100 to-sky-100 hover:text-blue-600 active:text-opacity-75 focus:outline-none focus:ring shadow-gray-200 shadow-xl">
                <BtnLogin provider={providers.facebook} />
                <Image
                  src="/facebook.png"
                  alt="/Avatar.png"
                  width={60}
                  height={5}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex cursor-pointer rounded-full bg-gradient-to-r from-green-50 via-green-100 to-teal-100 hover:text-emerald-600 active:text-opacity-75 focus:outline-none focus:ring shadow-gray-200 shadow-xl">
                <BtnLogin provider={providers.line} />
                <Image
                  src="/line.png"
                  alt="/Avatar.png"
                  width={60}
                  height={10}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
export default signIn;
