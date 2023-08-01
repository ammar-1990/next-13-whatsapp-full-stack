"use client";
import { SlMagnifier } from "react-icons/sl";
import { AiFillCaretDown } from "react-icons/ai";
import {useSearchParams , useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import List from "./List";
import { useSocket } from "@/providers/MyProvider";
type Props = {arrow?:boolean};

const SearchComponent = ({arrow}: Props) => {





    const {dispatch,state} = useSocket()


  return (
    <div className="  bg-secondary  flex flex-col">
         <div className={`${!arrow && 'pl-6'} py-2 mt-2 flex items-center  w-full`}>
      <div className="flex items-center flex-1 p-1 px-3 gap-3 bg-primary rounded-lg">
        <span className="">
          <SlMagnifier size={15} color={"white"} />
        </span>

        <input
          placeholder="Search"
        value={state.search}
        onChange={(e)=>dispatch({type:"SEARCH",payload:e.target.value})}
          type="text"
          className="flex-1 p-1 text-xs bg-primary outline-none text-white w-12"
        />
      </div>
      { !arrow &&<span className="cursor-pointer px-4 ">
        <AiFillCaretDown size={20} color="white" />
      </span>}
    </div>
   
    </div>
   
  );
};

export default SearchComponent;
