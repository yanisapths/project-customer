import React,{ useState , useEffect } from 'react'
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import  { db } from "../../lib/firebase"

function Member({ id,firstname, lastname}) {

  return (
    <div>
        <div className="p-1 shadow-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-2xl">
            <a className="block p-6 bg-white sm:p-8 rounded-xl">
                    <div>
                            <h1 className="text-black">{firstname}</h1>
                    </div>
            </a>
            </div>
    </div>
  )
}

export default Member