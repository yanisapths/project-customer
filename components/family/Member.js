import React,{ useState , useEffect } from 'react'
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import  { db } from "../../lib/firebase"
import Card from "./Card";

function Member() {
        const [members, setMembers] = useState([]);
        const [data, setData] = useState();
        useEffect(
                () =>
                 onSnapshot(
                     query(collection(db, 'members'), orderBy('timestamp', 'desc')) , 
                    snapshot => {
                        setMembers(snapshot.docs);
                    }
                 ),
            [db]
            );

console.log(members)

  return (
    <div>
        <div>
          {data && (
            <>
            {data.members.map((member,[index]) =>
                        // <div 
                        // key={index}
                        // id={inputField.id}
                        // firstname={inputField.data().firstname}
                        // />
                        <div key={index}  firstname={member.data().firstname}><h1>{member.firstname}</h1></div>
              )}
            </>
              )}
        </div>
    </div>
  )
}

export default Member

