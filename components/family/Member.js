import React,{ useState , useEffect } from 'react'
import { collection, onSnapshot, orderBy, query, getDocs } from "@firebase/firestore";
import  { db } from "../../lib/firebase"
import Card from "./Card";

function Member(id,firstname,index) {
  const [inputs, setInputs] = useState([ ]);
  // const values = [...inputField];
  // const colRef = collection(db,'members')
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

        // getDocs(colRef).then((snapshot) => {
        //   let members = []
        //   snapshot.docs.forEach((doc) => {
        //     members.push({...doc.data(), id: doc.id })
        //   })
        //   console.log(members)
        // })
        // .catch(err => console.log(err.message))
 

// console.log(values)


  return (
    <div>
        <div>
        {inputs.map((input) =>
                    <Card 
                    key={input.id}
                    id={input.id}
                    firstname={input.data().firstname}
                    />
                )} 
        </div>
    </div>
  )
}

export default Member

