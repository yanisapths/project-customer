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
    <header className="font-noto sticky top-0 z-50 grid grid-cols-3 shadow-md bg-white p-5 md:px-10 rounded-b-2xl">
      {/* Left */}
      <div
        onClick={() => router.push("/")}
        className="relative flex items-center h-16 cursor-pointer my-auto"
      >
        <Image
          src="/olivelogo.png"
          alt="/Avatar.png"
          width={110}
          height={110}
          //    layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      {/* Middle  - Search */}
      <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm appearance-none outline-none ">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className=" flex-grow pl-5 text-teal-900 bg-transparent outline-none border-none appearance-none focus:outline-none"
          type="text"
          placeholder={placeholder || "ค้นหาคลินิกในจังหวัด..."}
        />
        <SearchIcon
          onClick={search}
          className="hidden md:inline-flex h-8 bg-[#7bc6b7] text-white rounded-full p-2 cursor-pointer md:mx-2"
        />
      </div>

      {/* Right */}
      <div className="flex items-center space-x-4 justify-end text-teal-900">
        <Link href="https://daycare-portal.vercel.app/">
          <p className="hidden md:inline text-teal-900 cursor-pointer">
            เป็นเจ้าของคลิกนิกกายภาพ{" "}
            <GlobeAltIcon className="h-6  md:inline " />
          </p>
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
                    width="55"
                    height="55"
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
                      width="55"
                      height="55"
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
              <div className="px-1 py-1 ">
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
