'use client'
import Image from 'next/image'
import React, { Dispatch, SetStateAction, useCallback, useState, useRef } from 'react'
import {BsCameraFill} from 'react-icons/bs'
import Menu from './Menu'
import ImagesLibrary from './ImagesLibrary'

type Props = {
    sm?:boolean,
    md?:boolean,
    image:string
    setImage:Dispatch<SetStateAction<string>>,
  
    
}

const Avatar = ({sm,md,image,setImage }: Props) => {

    const [coordinates, setCoordintates] = useState({x:0,y:0})
    const [showMenue, setShowMenue] = useState(false)
    const [showLibrary, setShowLibrary ] = useState(false)
    const avRef=useRef<HTMLDivElement>(null)

const data = [
    {
        name:'take photo',
        callback:()=>{}
    },
    {
        name:'choose from library',
        callback:()=>{setShowLibrary(true);setShowMenue(false)}
    },
    {
        name:'upload photo',
        callback:(e:any)=>{
             const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = () => {
    setImage(reader.result as string);
   
  };
     setShowMenue(false)   },
        file:true
    },
    {
        name:'remove photo',
        callback:()=>{setImage('/images/avatars/default.png');setShowMenue(false)}
    },
]


const handleClick = useCallback((e:React.MouseEvent<HTMLDivElement>)=>{
    setCoordintates({x:e.pageX,y:e.pageY})
  
    setShowMenue(true)

},[setCoordintates,setShowMenue])

    if(sm)return(
    <div className='w-10 h-10 rounded-full relative overflow-hidden cursor-pointer'>
        <Image fill src={image} alt='avatar'/>

    </div>)
    if(md)return(
    <div className='w-12 h-12 rounded-full relative overflow-hidden cursor-pointer'>
     <Image fill src={image} alt='avatar'/>
    </div>)



  return (
    <div ref={avRef}   className='w-fit' >
          <div
        
    onClick={handleClick}
    className='w-32 h-32 rounded-full relative overflow-hidden cursor-pointer flex items-center justify-center group'
    >     <Image  id='menu'fill src={image} alt='avatar' className='group-hover:opacity-20 object-contain sm:opacity-100 opacity-20'/>
    <div className='absolute flex sm:hidden group-hover:flex flex-col items-center mt-8 '>
<BsCameraFill color='white' size={20} />
<p className='text-white'>Add photo</p>

    </div>

    </div>
    {showMenue && <Menu avRef={avRef} coordinates={coordinates} data={data} setShowMenue={setShowMenue}/>}
    {showLibrary && <ImagesLibrary setImage={setImage} setShowLibrary={setShowLibrary} />}
    </div>
  
  )
}

export default Avatar