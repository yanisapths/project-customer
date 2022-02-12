import Image from "next/image";

function SmallCard( {img,location,distance} ) {
  return (
    <div className="flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer hover:bg-teal-50 hover:scale-105 transition transform duration-200 ease-out">
        {/* Left */}
        <div className="relative h-16 w-16">
          <Image src={img} layout="fill" className="rounded-lg"/>
        </div>
           
        {/* Right */}
        <div>
            <h2 className="text-teal-900 text-xl font-bold">{location}</h2>
            <h3 className="text-teal-700">{distance}</h3>
        </div>
    </div>
  );
}

export default SmallCard;