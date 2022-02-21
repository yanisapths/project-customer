import React,{ useState , useEffect } from 'react'
import { collection, onSnapshot, orderBy, query, } from "@firebase/firestore";
import  { db } from "../../lib/firebase"
import Card from "./Card";

function Member(id,firstname,index) {
        const [members, setMembers] = useState([]);
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
        {members.map((inputField, index) =>
                    <Card 
                    key={index}
                    id={inputField.id}
                    // firstname={inputField[index].firstname}
                    />
                )} 
        </div>
    </div>
  )
}

export default Member

