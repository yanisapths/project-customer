import React from 'react'
import { useSession} from "next-auth/react";
import Image from "next/image"

export default function UserProfile({session}) {
    const { data: session } = useSession();
  return (
    <div className="box-center">   
        <Image 
            className="rounded-full cursor-pointer"
            src={session.user.image}
            layout="fixed"
            width="55"
            height="55"
        />
        <p>
            <i>@{session.user.email}</i>
        </p>
        <h1></h1>
    </div>
  )
}
