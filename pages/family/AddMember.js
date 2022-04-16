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
    const msgRef = useRef(null);
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
                message: msgRef.current.value,
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
            <form action="" className="bg-white space-y-4 -mt-24 px-8 py-32  md:p-24 md:py-36 md:m-4 rounded-lg shadow-lg">
            <XIcon onClick={goBack} className="text-white bg-black/75 rounded-full w-6 h-6 mb-8 cursor-pointer"/>
            <p className="text-xl font-extrabold md:text-4xl md:mb-2 ">เพิ่มสมาชิกครอบครัว</p>
            <span className="text-sm  md:text-lg font-medium  -pt-2 ">เพื่อใช้เลือกบุคคลที่ต้องการดูแล😊</span>

            <div className=" md:pt-8 " >
            <label  className="text-sm md:text-lg font-extrabold">ชื่อ</label>
                <div className="relative mt-1 p-1 rounded-xl bg-gradient-to-r from-indigo-200 via-teal-200 to-emerald-100 focus:outline-none focus:ring">
                    <input
                        ref={firstnameRef}
                        type="text"
                        name="firstname"
                        className="bg-white/70 w-full p-6 pr-12 text-sm border-gray-200  rounded-lg "
                        placeholder=""
                    />
                </div>
            <div className="pt-6">
            <label className="text-sm md:text-lg font-extrabold">นามสกุล</label>
            <div className="relative mt-1  p-1 rounded-xl bg-gradient-to-r from-indigo-200 via-teal-200 to-emerald-100 focus:outline-none focus:ring">
                <input
                    ref={lastnameRef}
                    type="text"
                    name="lastname"
                    className="bg-white/70 w-full p-6 pr-12 text-sm border-gray-200 rounded-lg"
                    placeholder=""
                />
            </div>
            </div>
            </div>
            <div className="pt-6">
                <div>
                    <label className="sr-only" for="message">Message</label>
                        <div className="relative mt-1 p-1 rounded-xl bg-gradient-to-r from-indigo-200 via-teal-200 to-emerald-100 focus:outline-none focus:ring">
                            <textarea
                            className="w-full p-5 text-lg rounded-lg bg-white/70"
                            placeholder="รายละเอียดเพิ่มเติม...."
                            rows="3"
                            id="message"
                            ref={msgRef}
                            ></textarea>
                        </div>
            </div>
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
