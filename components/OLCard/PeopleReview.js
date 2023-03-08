import React from "react";
import Image from "next/image";
import ReactStars from "react-rating-stars-component";

function PeopleReview({ imageUrl, customerName, comments, createdAt, score }) {
  const ratingStar = {
    size: 30,
    value: score,
    edit: false,
    isHalf: true,
  };

  return (
    <div className="translation hover:shadow-lg rounded-lg lg:p-8 p-2 pb-4">
      <div className="flex items-center space-x-4">
        {!imageUrl && (
          <>
            <Image
              className="rounded-full cursor-pointer"
              src="/Avatar.png"
              alt="/Avatar.png"
              width="60"
              height="60"
              layout="fixed"
            />
          </>
        )}
        {imageUrl && (
          <>
            {imageUrl && (
              <Image
                alt="/Avatar.png"
                className="rounded-full cursor-pointer"
                src={imageUrl}
                layout="fixed"
                width="60"
                height="60"
              />
            )}
          </>
        )}
        <div className="">
          <p className="text-[#121212]">{customerName}</p>

          <p className="text-[#121212]/50">
            รีวิวเมื่อ: {new Date(createdAt).toLocaleDateString("th-TH")}
          </p>
        </div>
      </div>
      <div className="items-center mb-1 lg:px-16 px-2">
        <div className="px-2 pt-2"><ReactStars {...ratingStar} /></div>
        <p className="body2 lg:h6 px-2">{comments}</p>
      </div>
    </div>
  );
}

export default PeopleReview;
