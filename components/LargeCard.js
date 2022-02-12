import Image from "next/image";

function LargeCard( { img, title, description , buttonText} ) {
  return (
    <div className="relative py-16 cursor-pointer">
        <div className="relative h-96 min-w-[300px]">
        <Image src={img} layout="fill" objectFit="cover" className="rounded-2xl opacity-85"/>
        </div>
        <div className="absolute top-32 left-12 xl:top-28">
            <h3 className="text-7xl mb-3 w-64 text-white font-black shadow-3xl xl:w-100 ">{title}</h3>
            <p className="text-white font-black text-2xl shadow-3xl xl:text-3xl">{description}</p>
            <button className="text-xl text-teal-900  bg-teal-200 px-4 py-2 rounded-lg mt-5 font-extrabold shadow-2xl ">{buttonText}</button>
        </div>
    </div>
  )
}

export default LargeCard