"use client";
import { SlMagnifier } from "react-icons/sl";
import { SlOptionsVertical } from "react-icons/sl";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsFillCameraVideoFill } from "react-icons/bs";
import Avatar from "@/app/(auth)/signin/Avatar";
import React ,{useState,useRef,useCallback} from "react";
import { User } from "@/actions/getCurrentUser";
import { useSocket } from "@/providers/MyProvider";
import Menu from "@/app/(auth)/signin/Menu";
import { useRouter } from "next/navigation";

type Props = { user: User | null };



const ChatHeader = ({ user }: Props) => {
  const [coordinates, setCoordintates] = useState({x:0,y:0})
const [showMenue, setShowMenue] = useState(false)
const spRef = useRef(null)
  const { state, dispatch } = useSocket();

  const handleVoice = () => {
    dispatch({ type: "voiceCall", payload: { ...user, type: "out-going",callType:"voice",roomId:Date.now() } });
  };
  const handleVideo = () => {
    dispatch({ type: "videoCall", payload: { ...user, type: "out-going",callType:"video",roomId:Date.now() } });
  };

  const router = useRouter()

  const data = [{
    name:"Exit",
    callback:(e:React.MouseEvent)=>{
      router.push('/');
      e.stopPropagation()
      setShowMenue(false)
    }
  }]


  const handleClick =useCallback((e:React.MouseEvent<HTMLSpanElement>)=>{
setCoordintates({x:e.pageX-40,y:e.pageY})
setShowMenue(true)
  },[setShowMenue,setCoordintates])

  return (
    <div className="p-3 h-[70px] flex items-center justify-between ">
      <div className="flex items-center gap-5">
        <Avatar image={user?.profileImg as string} sm />
        <div className="flex flex-col text-xs text-white">
          <span className="font-semibold">{user?.name}</span>
          <span>{state.onlineUsers?.includes(user?.id)? 'online':'offline'}</span>
        </div>
      </div>

      <div className="flex items-center gap-7">
        {/* <span className="text-white  cursor-pointer" onClick={handleVoice}>
          <IoIosCall size={20} />
        </span> */}
        <span className="text-white  cursor-pointer md:hidden" title="Chat" onClick={()=>dispatch({type:'SHOW_CHAT'})}>
          <RxHamburgerMenu size={20} />
        </span>
        <span className="text-white  cursor-pointer" onClick={handleVideo} title="Video call">
          <BsFillCameraVideoFill size={20} />
        </span>
        <span
        title="Search"
          onClick={() => {
            dispatch({ type: "ON" });
            console.log(state.isSearching);
          }}
          className="text-white  cursor-pointer"
        >
          <SlMagnifier size={20} />
        </span>
        <span ref={spRef} className="text-white  cursor-pointer" onClick={handleClick}>
          <SlOptionsVertical size={20} />
          {showMenue && <Menu setShowMenue={setShowMenue} coordinates={coordinates} avRef={spRef} data={data} />}
        </span>
      </div>
    </div>
  );
};

export default ChatHeader;
