import React, { useState  } from 'react'
import { XIcon, 
  MinusIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import { familyState } from "../../atom/familyAtom";
import { useRecoilState } from 'recoil';
import { Dialog , Transition } from "@headlessui/react"
import { Fragment } from "react";


export default function AboutCard() {
  const [ open, setOpen] = useRecoilState(familyState); 

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
    <Transition.Root show={open} as={Fragment}>
      <Dialog
       as="div"
       className="fixed z-10 inset-0  overflow-y-auto"
       onClose={setOpen}
      >      
      <div className="flex items-end justify-center rounded-2xl  h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFlow="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
        <Dialog.Overlay className="overflow-hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
        </Transition.Child>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"> &#8203;</span>    
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFlow="opacity-0 translate-y-4 sm:transition-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-4 sm:scale-100 "
          leave="ease-in duration-200"
          leaveFrom="opacity-100 transition-y-0 sm:scale-95"
          leaveTo="opacity-0  translate-y-4 sm:transition-y-0 sm:scale-95"
        >
          <div className="inline-block align-middle bg-white px-12 py-20 rounded-2xl pb-4  md:px-80 md:py-30  text-left overflow-hidden shadow-xl transform transition-all  sm:align-midde sm:max-w-sm sm:w-full sm:p-6 md:align-middle md:max-w-2xl md:w-full md:p-8">

            <form action="" className= "">
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


            </div>
        </Transition.Child>
        </div> 
      </Dialog>

    </Transition.Root>
  )
}
