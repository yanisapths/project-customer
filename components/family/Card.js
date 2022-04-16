import React,{ useState } from 'react'
import { XIcon, 
  MinusIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import { toast } from "react-hot-toast";
import  { db } from "../../lib/firebase"
import { deleteDoc , doc } from "@firebase/firestore"
import Image from "next/image"

function Card({id,firstname,lastname,message}) {

  const deleteMember = async  (id,e) => {
    e.stopPropagation();
    const docRef = doc(db, "members" , id);
    await deleteDoc(docRef);
    toast.success(` ลบออกจากรายการแล้ว `);
  }

  return (
    <div className="mt-6">
           <div className="max-w-xl xl:max-w-3xl p-1 shadow-xl rounded-2xl bg-white focus:outline-none focus:ring">
                <a className="flex p-4 justify-between md:p-6 bg-teal-100 sm:p-8 rounded-xl">
                  <div className="flex ">
                    <Image
                      src="/Avatar.png"
                      className="w-16 h-16 rounded-full"
                      width="80"
                      height="80"
                      layout="fixed"
                    />
                <div className="ml-3 md:ml-8 ">
                  <h5 className="text-md md:text-lg font-semibold">{firstname} {lastname}</h5>
                <div className="mt-4 space-y-2">
                  <div className="block h-full p-4 border border-gray-700 rounded-lg hover:border-pink-600">
                    <h5 class="font-semibold">Message</h5>

                    <p class="mt-1 text-sm md:text-lg font-medium ">
                    {message}
                    </p>
                  </div>
                </div>
                  </div>
                </div>
                  <TrashIcon 
                    onClick = {e => deleteMember(id,e)}
                    className="text-black rounded-full w-6 h-6 cursor-pointer "
                  />
                </a>
            </div>
    </div>
  )
}

export default Card

