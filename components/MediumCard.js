import Image from "next/image";
import Link from "next/link";

function MediumCard( {img, title, link} ) {
  return (
    <div className="cursor-pointer hover:scale-105 transition transform duration-300 ease-out">
        <div className="relative h-80 w-80">
          <Link href={link} className="cursor-pointer">
            <Image src={img} layout="fill" className="rounded-xl" />
          </Link>
        </div>
        <h3 className="text-2xl mt-3">{title}</h3>
    </div>
  );
}

export default MediumCard;