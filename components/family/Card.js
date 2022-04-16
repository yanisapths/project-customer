import React,{ useState } from 'react'
import { XIcon, 
  MinusIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import { toast } from "react-hot-toast";
import  { db } from "../../lib/firebase"
import { deleteDoc , doc } from "@firebase/firestore"

function Card({id,firstname,lastname,username}) {

  const deleteMember = async  (id,e) => {
    e.stopPropagation();
    const docRef = doc(db, "members" , id);
    await deleteDoc(docRef);
    toast.success(` ลบออกจากรายการแล้ว `);
  }

  return (
    <div>
           <div className="p-1 shadow-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-2xl">
                <a className="flex justify-between p-6 bg-white sm:p-8 rounded-xl">
                 {firstname} {lastname}
                  <TrashIcon 
                    onClick = {e => deleteMember(id,e)}
                    className="text-black rounded-full w-6 h-6 "
                  />
                </a>
            </div>
    </div>
  )
}

export default Card

