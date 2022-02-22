import  { db , storage } from "../../lib/firebase"
import { addDoc, collection , serverTimestamp ,updateDoc  } from "@firebase/firestore";
import { ref  } from "@firebase/storage";
import {useSession} from "next-auth/react";
import { toast } from "react-hot-toast";
import React, { useState , useRef } from 'react'
import { XIcon, 
  MinusIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import { useRouter } from "next/router";
import Head from "next/head"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import FooterSocial from '../../components/FooterSocial'
import router from "next/router"

export default function AboutCard() {
    const {data: session,status} = useSession();
    const [loading, setLoading] =useState();
    const firstnameRef = useRef(null);
    const lastnameRef = useRef(null);
    // const colRef = collection(db,'members')
    const goBack = () => {
        router.push("/family/");
      };

    //   const addMemberForm = document.querySelector(''.add')
    //   addMemberForm.addEventListener('submit', (e) => {
    //     e.preventDefault()
    //     addDoc(colRef, {
    //         username: session.user,
    //         firstname: addMemberForm.firstname.value,
    //         lastname: addMemberForm.lastname.value,
    //         timestamp: serverTimestamp(),
    //     })
    //   })
    // const [inputField, setInputField] = useState([
    //     {
    //         firstname: ' ', 
    //         lastname: ' ',
    //     },
    // ])
   
    // const handleChangeInput = (event) => {
    //     const values = [...inputField];
    //     values[event.target.name] = event.target.value;
    //     setInputField(values);
    // }
    const handleNext = (e) => {
      e.preventDefault();
      console.log("inputField", firstnameRef);
    //   console.log("inputField", inputField[0].firstname);
    } 

    const onSubmit = async (e) => {
        e.preventDefault();
        if(loading) return;
        setLoading(true);
        // 1) Create a member and add to firestore 'members' collection
        // 2) Get the member ID for the newly created member
        // 3)  Upload the info. to firebase storage and the member ID
        // 4) get a download URL from fb storage and update the original member with info
        
        try{
            const docRef = await addDoc(collection(db, 'members' ), {  //1
                username: session.user,
                firstname: firstnameRef.current.value,
                lastname: lastnameRef.current.value,
                // firstname: firstnameRef.current.value,
                // lastname: lastnameRef.current.value,
                timestamp: serverTimestamp(),
                
            });
            toast.success(` ${firstnameRef.current.value} ได้ถูกเพิ่มลงในครอบครัว 🎉`);
            router.push('/family/');
            
            console.log("New doc added with ID" , docRef.id ); //2
            // const firstnameRef = ref(storage, `members/${docRef.id}/firstname`); 
            
        }
        catch (err) {
            toast.error(err);
        }
        setLoading(false);
        
    };

  return (
    <>
    <div  className="bg-gradient-to-r from-indigo-200 via-teal-200 to-emerald-100 h-screen -mb-16 md:-mb-28">
        {/* <Header /> */}
    <Head>
        <title>Olive | Add Member </title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header/>
        <main className="md:absolute max-w-4xl  md:max-w-[60%] 2xl:max-w-[50%] md:w-[70%] right-0  ">

            <form action="" className="  bg-white p-8  mt-6 mb-0 space-y-4 md:p-10 rounded-2xl shadow-2xl md:py-64 md:-mt-10">
            <XIcon onClick={goBack} className="text-white bg-gray-500 rounded-full w-6 h-6 mb-8"/>
            <p className="text-xl font-extrabold md:text-4xl md:mb-2 ">เกี่ยวกับสมาชิก</p>
            <span className="text-sm  md:text-lg font-medium  -pt-2 ">ใส่ข้อมูลเพียงเล็กน้อยก็เสร็จ😊</span>
            
        {/* {  inputField.map((inputField) => ( */}
            <div className=" md:pt-8  " >
        <div >
            <label  className="text-sm md:text-lg font-extrabold">ชื่อ</label>

            <div className="relative mt-1">
            <input
                // value={inputField.firstname}
                // onChange={event => handleChangeInput(event)}
                ref={firstnameRef}
                type="text"
                name="firstname"
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm "
                placeholder=""
            />
            </div>
        <div className="pt-2">
            <label className="text-sm md:text-lg font-extrabold">นามสกุล</label>

            <div className="relative mt-1">
            <input
                // value={inputField.lastname}
                // onChange={event => handleChangeInput(event)}
                ref={lastnameRef}
                type="text"
                name="lastname"
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder=""
            />
            </div>
        </div>
        </div>
            </div>
            {/* ))}  */}
        <div className="flex justify-between pt-10">
        <nav className="flex text-sm border-b border-gray-100 text-font-medium">
                <a href="" className="hidden p-2  border-b border-black text-black font-extrabold md:text-lg ">
                    ย้อนกลับ
                </a>
        </nav>
        <button type="submit" className="block px-5 py-3  text-sm md:text-xl md:font-extrabold font-medium text-white bg-black rounded-lg"
            onClick={handleNext}
        >
            ถัดไป
        </button>
        </div>
        <button type="submit" className="block px-5 py-3  text-sm md:text-xl md:font-extrabold font-medium text-white bg-black rounded-lg"
            onClick={onSubmit}
        >
            Submit
        </button>
        </form>
        </main>
    <Footer/>
    </div>
    </>
  )
}
