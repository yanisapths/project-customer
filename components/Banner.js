import React from 'react';
import Image from 'next/image';

function Banner({imageUrl}) {
  return (
    <div className="relative h-40 lg:h-[300px] xl:h-[400px] 2xl:h-[500px] font-noto">
          <Image  src={imageUrl}
           layout="fill" 
           objectFit="cover"
           className=""
           alt="/tree.jpg"
           />
    </div>
  )
}

export default Banner