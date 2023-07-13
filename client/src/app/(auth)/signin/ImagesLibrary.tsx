"use client";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { AiOutlineClose } from "react-icons/ai";

type Props = {
  setImage: Dispatch<SetStateAction<string>>;
  setShowLibrary: React.Dispatch<React.SetStateAction<boolean>>;
};

const ImagesLibrary = ({ setImage, setShowLibrary }: Props) => {
  const images = [
    "/images/avatars/1.png",
    "/images/avatars/2.png",
    "/images/avatars/3.png",
    "/images/avatars/4.png",
    "/images/avatars/5.png",
    "/images/avatars/6.png",
    "/images/avatars/7.png",
    "/images/avatars/8.png",
    "/images/avatars/9.png",
  ];
  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="relative grid grid-cols-3 p-12 bg-gray-900 gap-12 rounded-lg">
        <span
          onClick={() => setShowLibrary(false)}
          className="flex items-center justify-center p-3 absolute top-0 right-0 cursor-pointer"
        >
          <AiOutlineClose color="white" size={20} />
        </span>
        {images.map((el) => (
          <div
            className="w-12 h-12 rounded-full cursor-pointer relative group  "
            onClick={() => {
              setImage(el);
              setShowLibrary(false);
            }}
          >
            <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-transparent -top-2 -left-2 group-hover:border-green-500 duration-300"></div>
            <Image key={el} fill src={el} alt="avatar" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesLibrary;
