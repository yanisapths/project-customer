import React, { useState  } from 'react'
import { XIcon, 
  MinusIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import Head from "next/head"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import FooterSocial from '../../components/FooterSocial'
import router from "next/router"


export default function AboutCard() {
    const [inputField, setInputField] = useState([
        { firstname: ' ', lastname: ' '},
    ])
    const handleChangeInput = (index,event) => {
        const values = [...inputField];
        values[index][event.target.name] = event.target.value;
        setInputField(values);
    }
    const handleNext = (e) => {
      e.preventDefault();
      console.log("inputField", inputField);
    } 

  return (
    <div  className="bg-gradient-to-r from-indigo-200 via-teal-200 to-emerald-100 h-screen -mb-16 md:-mb-28">
        {/* <Header /> */}
    <Head>
        <title>Olive | Add Member </title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header/>
        <main className="md:absolute max-w-4xl  md:max-w-[60%] 2xl:max-w-[50%] md:w-[70%] right-0  ">

            <form action="" className="  bg-white p-8  mt-6 mb-0 space-y-4 md:p-10 rounded-2xl shadow-2xl md:py-64 md:-mt-10">
            <XIcon className="text-white bg-gray-500 rounded-full w-6 h-6 mb-8"/>
            <p className="text-xl font-extrabold md:text-4xl md:mb-2 ">เกี่ยวกับสมาชิก</p>
            <span className="text-sm  md:text-lg font-medium  -pt-2 ">ใส่ข้อมูลเพียงเล็กน้อยก็เสร็จ😊</span>
            
        {  inputField.map((inputField, index) => (
            <div key={index} className=" md:pt-8  " >
        <div >
            <label  className="text-sm md:text-lg font-extrabold">ชื่อ</label>

            <div className="relative mt-1">
            <input
                value={inputField.firstname}
                onChange={event => handleChangeInput(index, event)}
                type="Name"
                name="firstname"
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm "
                placeholder=""
            />
            </div>
        <div className="pt-2">
            <label className="text-sm md:text-lg font-extrabold">นามสกุล</label>

            <div className="relative mt-1">
            <input
                value={inputField.lastname}
                onChange={event => handleChangeInput(index, event)}
                type="lastname"
                name="lastname"
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder=""
            />
            </div>
        </div>
        </div>
            </div>
            ))} 
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
        </form>
        </main>
    <Footer/>
    </div>
  )
}
