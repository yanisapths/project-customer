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
import Select from "../../components/family/Select"

export default function AboutCard() {
    const {data: session,status} = useSession();
    const [loading, setLoading] =useState();
    const firstnameRef = useRef(null);
    const lastnameRef = useRef(null);
    const bathRef = useRef(null);
    const friendRef = useRef(null);
    const driveRef = useRef(null);
    const massageRef = useRef(null);
    const goBack = () => {
        router.push("/family/");
      };
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
                timestamp: serverTimestamp(),
                name:session.user.name
                
            });
            toast.success(` ${firstnameRef.current.value} ได้ถูกเพิ่มลงในครอบครัว 🎉`);
            router.push('/family/');
            //console.log("New doc added with ID" , docRef.id ); //2
            
        }
        catch (err) {
            toast.error(err);
        }
        setLoading(false);
        
    };

  return (
    <>
    <div  className="bg-gradient-to-r from-indigo-200 via-teal-200 to-emerald-100 h-screen  md:-mb-40">
        {/* <Header /> */}
    <Head>
        <title>Olive | Add Member </title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header/>
        <main className="overflow-hidden ">
            <form action="" className="bg-white space-y-4 -mt-24 px-8 py-32  md:p-24 md:py-36 md:m-4">
            <XIcon onClick={goBack} className="text-white bg-gray-500 rounded-full w-6 h-6 mb-8"/>
            <p className="text-xl font-extrabold md:text-4xl md:mb-2 ">เพิ่มสมาชิกครอบครัว</p>
            <span className="text-sm  md:text-lg font-medium  -pt-2 ">ใส่ข้อมูลเพียงเล็กน้อยก็เสร็จ😊</span>

            <div className=" md:pt-8 " >
            <label  className="text-sm md:text-lg font-extrabold">ชื่อ</label>
                <div className="relative mt-1">
                    <input
                        // onChange={event => handleChangeInput(event)}
                        ref={firstnameRef}
                        type="text"
                        name="firstname"
                        className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-lg "
                        placeholder=""
                    />
                </div>
            <div className="pt-2">
            <label className="text-sm md:text-lg font-extrabold">นามสกุล</label>
            <div className="relative mt-1">
                <input
                    ref={lastnameRef}
                    type="text"
                    name="lastname"
                    className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-lg"
                    placeholder=""
                />
            </div>
            </div>
            </div>
            <div className="w-full bg-white rounded-lg shadow-lg  ">
                    {/* <p className="text-sm md:text-lg font-extrabold mb-4">  บริการทีต้องการ</p>
                        <ul className="divide-y-2 space-y-6 divide-gray-100">
                            <li className="p-6 hover:bg-blue-600 hover:text-blue-200 shadow-md"   ref={bathRef}   name="bath">
                                อาบน้ำ แต่งตัว ประคอง 
                            </li>
                            <li className="p-6 hover:bg-blue-600 hover:text-blue-200  shadow-md" ref={friendRef} name="friend">
                                อยู่เป็นเพื่อน ทำกิจกรรม
                            </li>
                            <li className="p-6 hover:bg-blue-600 hover:text-blue-200  shadow-md" ref={driveRef} name="drive">
                                ขับรถไปรับ-ส่ง
                            </li>
                            <li className="p-6 hover:bg-blue-600 hover:text-blue-200  shadow-md" ref={massageRef} name="massage">
                                นวด
                            </li>
                        </ul> */}
                        {/* <Select /> */}
            </div>

        <div className="flex justify-between pt-10 ">
        <nav className="flex text-sm border-b border-gray-100 text-font-medium">
        </nav>
            <button type="submit" className="block px-5 py-3  text-sm md:text-xl md:font-extrabold font-medium text-white bg-black rounded-lg"
                onClick={onSubmit}
            >
                เพิ่ม
            </button>
        </div>
      
        </form>
        </main>
    <Footer/>
    </div>
    </>
  )
}
