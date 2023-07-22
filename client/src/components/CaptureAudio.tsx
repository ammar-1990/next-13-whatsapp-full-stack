"use client";
import { User } from "@/actions/getCurrentUser";
import { useSocket } from "@/providers/MyProvider";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { BiSolidMicrophone } from "react-icons/bi";
import { BsTrashFill } from "react-icons/bs";
import { FaPauseCircle, FaPlay, FaStop } from "react-icons/fa";
import { MdSend } from "react-icons/md";

type Props = {
  hide: Dispatch<SetStateAction<boolean>>;
  currentUser: User;
  user: User;
};

const CaptureAudio = ({ hide }: Props) => {
  const [isRecording, setIsRecording] = useState(true);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [waveform, setWaveform] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const waveFormRef = useRef<HTMLDivElement>(null);

  const {
    state: { newSocket },
  } = useSocket();

  const handlePlayRecording = useCallback(() => {}, []);

  const handlePauseRecording = useCallback(() => {}, []);

  const handleStartRecording = useCallback(() => {}, []);

  const handleStopRecording = useCallback(() => {}, []);


  const sendRecording = useCallback(async()=>{},[])

  return (
    <div className="flex justify-end w-full items-center">
      <button type="button" onClick={() => hide(false)} className="text-white">
        <BsTrashFill size={18} />
      </button>
      <div className="flex items-center justify-center mx-2 py-2 px-4 gap-3">
        {isRecording ? (
          <div className="text-red-500 animate-pulse ">
            Recording <span>{recordingDuration}s</span>
          </div>
        ) : (
          <div className="text-white">
            {recordedAudio && (
              <>
                {!isPlaying ? (
                  <FaPlay
                    role="button"
                    size={18}
                    onClick={handlePlayRecording}
                  />
                ) : (
                  <FaStop
                    role="button"
                    size={18}
                    onClick={handlePauseRecording}
                  />
                )}
              </>
            )}
          </div>
        )}

        <div className="w-60" hidden={isRecording} ref={waveFormRef} />
        {recordedAudio && isPlaying && <span>{currentPlaybackTime}</span>}
        {recordedAudio && !isPlaying && <span>{totalDuration}</span>}

        <audio ref={audioRef} hidden />

        <div className="mr-4">
          {!isRecording ? (
            <BiSolidMicrophone
              role="button"
              onClick={handleStartRecording}
              className="text-red-500"
              size={18}
            />
          ) : (
            <FaPauseCircle
              role="button"
              onClick={handleStopRecording}
              className="text-red-500"
              size={18}
            />
          )}
        </div>
      </div>
      <button type="button">   <MdSend color="white" title="send" onClick={sendRecording}/></button>
   
    </div>
  );
};

export default CaptureAudio;
