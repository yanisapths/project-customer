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
    <div  className="bg-gradient-to-r from-indigo-200 via-teal-200 to-emerald-100 h-screen -mb-16 md:-mb-28">
        {/* <Header /> */}
    <Head>
        <title>Olive | Add Member </title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header/>
        <main className="md:absolute max-w-4xl  md:max-w-[60%] 2xl:max-w-[50%] md:w-[70%] right-0 py-32 pt-0 ">
            <form action="" className="  bg-white p-8  mt-6 mb-0 space-y-4  md:p-10 shadow-2xl  md:mt-0">
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
                        className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm "
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
                    className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                    placeholder=""
                />
            </div>
            </div>
            </div>
                <div className="w-full bg-white rounded-lg shadow-lg lg:w-1/3">
                <p className="text-sm md:text-lg font-extrabold">   เลือกบริการทีต้องการ</p>
                <ul className="divide-y-2 divide-gray-100">
                    <li className="p-3 hover:bg-blue-600 hover:text-blue-200"   ref={bathRef}   name="bath">
                        อาบน้ำ แต่งตัว ประคอง 
                    </li>
                    <li className="p-3 hover:bg-blue-600 hover:text-blue-200" ref={friendRef} name="friend">
                        อยู่เป็นเพื่อน ทำกิจกรรม
                    </li>
                    <li className="p-3 hover:bg-blue-600 hover:text-blue-200" ref={driveRef} name="drive">
                        ขับรถไปรับ-ส่ง
                    </li>
                    <li className="p-3 hover:bg-blue-600 hover:text-blue-200" ref={massageRef} name="massage">
                        นวด
                    </li>
                </ul>
            </div>

        <div className="flex justify-between pt-10">
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
