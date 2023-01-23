import React, { useState, Fragment, useEffect, useRef } from "react";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import { SearchIcon, GlobeAltIcon, UsersIcon } from "@heroicons/react/solid";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useRouter } from "next/dist/client/router";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

function Header({ placeholder }) {
  const { data: session } = useSession();
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  const resetInput = () => {
    setSearchInput("");
  };

  const search = () => {
    router.push({
      pathname: "search",
      query: {
        address: searchInput,
      },
    });
  };

  return (
    <header
      className="mx-auto bg-[#f8f8f8] max-h-fit py-1 rounded-b-2xl px-6 md:px-12 xl:px-40 font-noto sticky top-0 z-50 grid grid-cols-3
    backdrop-blur-xl transition-colors duration-500 supports-backdrop-blur:bg-white dark:bg-[#f8f8f8]/60"
    >
      {/* Left */}
      <div className=" flex items-center my-auto cursor-pointer">
        <Image
          onClick={() => router.push("/")}
          src="/olivelogo.png"
          alt="/Avatar.png"
          width={80}
          height={80}
          //    layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
        <div className=" m-auto cursor-pointer md:visible invisible flex gap-4">
          <Link href="/about">
            <div className="rounded-full md:w-fit md:px-6 md:py-2  md:h-fit hover:bg-[#ACDED5]/20 text-[#005844] hover:underline">
              <p className=" md:body2 font-bold">About</p>
            </div>
          </Link>
          <Link href="/demo">
            <div className="rounded-full  md:w-fit  md:px-6  md:py-2  md:h-fit hover:bg-[#ACDED5]/20 text-[#005844] hover:underline">
              <p className=" md:body2 font-bold">Demo</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Middle  - Search */}
      <div className="flex items-center rounded-full appearance-none outline-none my-2 bg-[#f0f1f2]">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-grow pl-5 bg-transparent outline-none border-none appearance-none rounded-full focus:outline-none"
          type="text"
          placeholder={placeholder || "ค้นหาจังหวัด"}
        />
        <SearchIcon
          onClick={search}
          className="hidden lg:inline-flex lg:h-8 lg:bg-[#7bc6b7] lg:text-white lg:rounded-full lg:p-2 cursor-pointer lg:mx-2"
        />
      </div>

      {/* Right */}
      <div className="flex items-center space-x-4 justify-end text-teal-900">
        <Link href="https://daycare-portal.vercel.app/">
          <div className="rounded-full lg:p-3 lg:bg-[#ACDED5]/20 cursor-pointer translation hover:shadow-lg hover:shadow-black/5 duration-800 ease-in-out">
            <p className="hidden lg:inline text-[#005844">
              เป็นเจ้าของคลินิกกายภาพ{" "}
              <GlobeAltIcon className="h-6  lg:inline " />
            </p>
          </div>
        </Link>

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="flex items-center space-x-2 border-2 p-1 rounded-full">
              {/* Profile Pic */}
              {!session && (
                <>
                  <Image
                    className="rounded-full cursor-pointer"
                    src="/Avatar.png"
                    alt="/Avatar.png"
                    width="50"
                    height="50"
                    layout="fixed"
                  />
                </>
              )}
              {session && (
                <>
                  {session.user.image && (
                    <Image
                      alt="/Avatar.png"
                      className="rounded-full cursor-pointer"
                      src={session.user.image}
                      layout="fixed"
                      width="50"
                      height="50"
                    />
                  )}
                </>
              )}
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1">
                {!session && (
                  <>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={signIn}
                          className={`${
                            active ? "bg-[#7bc6b7] text-white" : "text-gray-900"
                          } group flex rounded-md items-center w-full px-4 py-2 text-sm  md:text-lg`}
                        >
                          Sign In | Register
                        </button>
                      )}
                    </Menu.Item>
                  </>
                )}
                {session && (
                  <>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={signOut}
                          className={`${
                            active ? "bg-[#7bc6b7] text-white" : "text-gray-900"
                          } group flex rounded-md items-center w-full px-4 py-2 text-sm md:text-lg`}
                        >
                          Sign Out
                        </button>
                      )}
                    </Menu.Item>
                  </>
                )}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto pt-8">
          <div className="flex justify-between space-x-8">
            <button
              onClick={resetInput}
              className="flex-grow text-gray-500 text-xl border-2 px-4 rounded-full"
            >
              ยกเลิก
            </button>
            <button
              onClick={search}
              className="flex-grow text-white text-xl bg-[#7bc6b7] border-2 px-4 rounded-full"
            >
              ค้นหา
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
export default Header;

function EditInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  );
}
