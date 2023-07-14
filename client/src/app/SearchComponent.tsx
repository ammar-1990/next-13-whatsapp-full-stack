"use client";
import { SlMagnifier } from "react-icons/sl";
import { AiFillCaretDown } from "react-icons/ai";
import {useSearchParams , useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import List from "./List";
type Props = {};

const SearchComponent = (props: Props) => {
const searchParams = useSearchParams()
    const router = useRouter()
    const [search, setSearch] = useState('')

    const handleChange = useCallback(()=>{
        const current = new URLSearchParams(Array.from(searchParams.entries()))
if(!search) {
    current.delete("search");
    router.push(`/?${current}`);
    router.refresh()
} 
else{
    current.set("search",search);
    router.push(`/?${current}`)} 


    },[search,router])

    useEffect(()=>{
        const timer = setTimeout(()=>{
            handleChange()
        },500)

        return ()=>clearTimeout(timer)
    },[handleChange])


  return (
    <div className="  bg-secondary flex-1 flex flex-col">
         <div className="pl-6 py-2 mt-2 flex items-center  w-full">
      <div className="flex items-center flex-1 p-1 px-3 gap-3 bg-primary rounded-lg">
        <span className="">
          <SlMagnifier size={15} color={"white"} />
        </span>

        <input
          placeholder="Search"
          value={search}
          onChange={e=>setSearch(e.target.value)}
          type="text"
          className="flex-1 p-1 text-xs bg-primary outline-none text-white w-12"
        />
      </div>
      <span className="cursor-pointer px-4 ">
        <AiFillCaretDown size={20} color="white" />
      </span>
    </div>
    <List />
    </div>
   
  );
};

export default SearchComponent;
