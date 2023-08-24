"use client";

import React, { useEffect,useRef } from "react";

type Props = {
  coordinates: { x: number; y: number };
  data: { name: string; callback: (e?:any) => void; file?: boolean | undefined }[];
  setShowMenue: React.Dispatch<React.SetStateAction<boolean>>;
  avRef:React.RefObject<HTMLDivElement>

};

const Menu = ({ coordinates, data, setShowMenue,avRef }: Props) => {


  useEffect(() => {
    const closeMenu = (e: any) => {
 if(!avRef.current?.contains(e.target)){
    setShowMenue(false)
 }

    };

    document.addEventListener("click", closeMenu);

    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);

  return (
    <div

      style={{ position: "fixed", top: coordinates.y, left: coordinates.x }}
      className={` block bg-secondary shadow-md text-white text-xs rounded-lg overflow-hidden z-50`}
    >
      <ul>
        {data.map((el) => {
          if (!el.file)
            return (
              <li
                onClick={el.callback}
                className="p-3 px-5 cursor-pointer capitalize hover:bg-[#28373f] z-50"
                key={el.name}
              >
                {el.name}
              </li>
            );

            if(el.file){

                return (
                    <li  key={el.name}  className="">
                        <label className="p-3 px-5  block cursor-pointer capitalize hover:bg-[#28373f] z-50" htmlFor="fileInput" >{el.name}</label>
                        <input id="fileInput" hidden type="file" onChange={el.callback} />
                    </li>
                )
            }
        })}
      </ul>
    </div>
  );
};

export default Menu;
