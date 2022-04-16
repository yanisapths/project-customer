import React,{ useState , useEffect } from 'react'
import { collection, onSnapshot, orderBy, query ,where } from "@firebase/firestore";
import  { db } from "../../lib/firebase"
import Card from "./Card";
import Image from 'next/image'
import {useSession} from "next-auth/react";

 function Member(reg) {
  const {data: session }= useSession();
  const [inputs, setInputs] = useState([ ]);

        useEffect( 
          () => 
          //const q = query(collection(db, 'members'), where("name", "==" ,  session?.user.name ) , orderBy('timestamp', 'desc'));
          onSnapshot(
            query(collection(db, 'members'), where("name", "==" ,  session?.user.name ) , orderBy('timestamp', 'desc')) , 
           snapshot => {
               setInputs(snapshot.docs)
           }
        ),
        [db] );

  return (
    <div>
        <div>
        {inputs.map((input) =>
              <Card 
                    key={input.id}
                    id={input.id}
                    firstname={input.data().firstname}
                    lastname={input.data().lastname}
                    username={input.data().username.name}
                    message={input.data().message}
              />
          )} 
        </div>
    </div>
  )
}

export default Member
