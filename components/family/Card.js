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
    <div className="mt-6 text-white">
           <div className="max-w-xl xl:max-w-3xl p-1 shadow-xl rounded-2xl focus:outline-none focus:ring">
                <a className="flex p-4 justify-between md:p-6 bg-teal-800  sm:p-8 rounded-xl">
                  <div className="flex ">
                    <Image
                      src="/Avatar.png"
                      alt="/Avatar.png"
                      className="w-16 h-16 rounded-full"
                      width="60"
                      height="60"
                      layout="fixed"
                    />
                <div className="ml-3 md:ml-8 ">
                  <h5 className="text-md md:text-lg font-semibold">{firstname} {lastname}</h5>
                <div className="mt-4 space-y-2">
                  <div className="block h-full p-4 border rounded-lg hover:border-teal-600 cursor-pointer ">
                    <h5 className="font-semibold">Detail</h5>

                    <p className="mt-1 text-sm md:text-lg font-xs">
                    {message}
                    </p>
                  </div>
                </div>
                  </div>
                </div>
                  <TrashIcon 
                    onClick = {e => deleteMember(id,e)}
                    className="text-gray-300 rounded-full w-6 h-6 cursor-pointer "
                  />
                </a>
            </div>
    </div>
  )
}

export default Card

