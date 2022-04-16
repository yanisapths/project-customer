import React,{ useState , useEffect } from 'react'
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import  { db } from "../../lib/firebase"
import Card from "./Card";
import {getSession} from 'next-auth/react'
import Image from 'next/image'

function Member({session}) {
  const [inputs, setInputs] = useState([ ]);
        useEffect(
                () =>
                 onSnapshot(
                     query(collection(db, 'members'), orderBy('timestamp', 'desc')) , 
                    snapshot => {
                        setInputs(snapshot.docs)
                    }
                 ),
            [db]
            );
  return (
    <div>
        <div>
        {inputs.map((input) =>
              <Card 
                    key={input.id}
                    id={input.id}
                    firstname={input.data().firstname}
                    lastname={input.data().lastname}
                    session={session}
                    username={input.data().username.name}
              />
          )} 
        </div>
    </div>
  )
}

export default Member

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
      props: { session },
  };
}

