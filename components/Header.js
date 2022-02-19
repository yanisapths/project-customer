import React, { useState } from 'react'
import Image from 'next/image';
import {
    SearchIcon,
    GlobeAltIcon,
    UsersIcon,
} from '@heroicons/react/solid';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from "next/dist/client/router";
import { signIn,signOut,useSession} from "next-auth/react";

function Header({ placeholder }) {
    const { data: session } = useSession()

    const [searchInput ,setSearchInput] = useState("");
    const [startDate, setStartDate] =  useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [noOfGuests, setNoOfGuests] = useState(1);
    const router = useRouter();

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }

    const resetInput = () => {
        setSearchInput("");
    }

    const search = () => {
        router.push({
            pathname: "search",
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                noOfGuests,
            }
        });
    };

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection'
    }


  return (
   <header className="sticky top-0 z-50 grid grid-cols-3 shadow-md bg-white p-5 md:px-10 rounded-b-2xl">
       {/* Left */}
       <div onClick={() => router.push("/")}
            className="relative flex items-center h-16 cursor-pointer my-auto">
           <Image  src="/olivelogo.png" 
           width={110}
           height={110}
        //    layout="fill"
           objectFit="contain"
           objectPosition="left"
           />
       </div>

       {/* Middle  - Search */}
       <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
           <input 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-grow pl-5 text-teal-900 bg-transparent outline-none" 
            type="text" placeholder={placeholder  || "ค้นหาศูนย์ดูแล"}
           />
           <SearchIcon className="hidden md:inline-flex h-8 bg-teal-500 text-white rounded-full p-2 cursor-pointer md:mx-2"/>
       </div>

       {/* Right */}
       <div className="flex items-center space-x-4 justify-end text-teal-900">
            <p className="hidden md:inline text-teal-900">เป็นเจ้าของศูนย์ดูแล</p>
            <GlobeAltIcon className="h-6" />

            <div className="flex items-center space-x-2 border-2 p-1 rounded-full">
                {/* Profile Pic */}
                {!session && (
                 <>
                    <Image onClick={signIn}
                        className="rounded-full cursor-pointer"
                        src="/Avatar.png"
                        width="55"
                        height="55"
                        layout="fixed"
                    />
                 </>
                 )}
                 {session && (
                 <> 
                 {session.user.image && (
                        <Image  onClick={signOut}
                        className="rounded-full cursor-pointer"
                         src={session.user.image}
                         layout="fixed"
                         width="55"
                        height="55"
                         
                        />
                    )}
                 </>
                 )}
            </div>
       </div>

        {searchInput && (
            <div className="flex flex-col col-span-3 mx-auto">
                <DateRangePicker ranges={[selectionRange]}
                    minDate={new Date()}
                    rangeColors={["#7BC6B7"]}
                    onChange={handleSelect}
                />
                <div>
                    <div className="flex items-center border-b mb-4">
                        <h2 className="text-2xl flex-grow font-semibold text-teal-900">
                            จำนวนผู้ต้องการดูแล
                        </h2>
                        
                        <UsersIcon className="h-5" />
                        <input 
                            value={noOfGuests}
                            onChange={(e) => setNoOfGuests(e.target.value)}
                            type="number" 
                            min={1}
                            className="w-12 pl-2 text-xl outline-none text-teal-600 font-semibold"
                        />
                    </div>
                        <div className="flex">
                            <button onClick={resetInput} className="flex-grow text-gray-500 text-2xl font-semibold">ยกเลิก</button>
                            <button onClick={search} className="flex-grow text-teal-600 text-2xl font-semibold">ค้นหา</button>
                        </div>
                </div>
            </div>
        )}
   </header>
  );
}
export default Header;
