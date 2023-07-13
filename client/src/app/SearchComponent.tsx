"use client";
import { SlMagnifier } from "react-icons/sl";
import { AiFillCaretDown } from "react-icons/ai";
type Props = {};

const SearchComponent = (props: Props) => {
  return (
    <div className="pl-6 py-2 mt-2 flex items-center  bg-[#141c20] ">
      <div className="flex items-center flex-1 p-1 px-3 gap-3 bg-primary rounded-lg">
        <span className="cursor-pointer">
          <SlMagnifier size={15} color={"white"} />
        </span>

        <input
          placeholder="Search"
          type="text"
          className="flex-1 p-1 text-xs bg-primary outline-none text-white"
        />
      </div>
      <span className="cursor-pointer px-4 ">
        <AiFillCaretDown size={20} color="white" />
      </span>
    </div>
  );
};

export default SearchComponent;
