"use client";
import { Message } from "@/actions/getAllMessages";
import { ReactNode, createContext, useContext, useReducer } from "react";
import { Socket } from "socket.io-client";

type voiceVideo = {
  id:number,
  name:string,
  email:string,
  profileImg?:string,
  createdAt:Date,
  updatedAt:Date,
  sentMessages?:Message[],
  recievedMessages?:Message[],
  type:string,
  callType:'voice' | 'video',
  roomId:Date
}


type State = {
  newSocket: Socket | null;
  messages: Message[] | [];
  isSearching: boolean;
  onlineUsers: null | any[];
  users: null | any[];
  search: string | "";
  voiceCall:voiceVideo | undefined ;
  videoCall:voiceVideo | undefined ;
  inVoiceCall: any;
  inVideoCall: any;
};

type Action = {
  type:
    | "NEW_SOCKET"
    | "MESSAGES"
    | "NEW_MESSAGE"
    | "OFF"
    | "ON"
    | "ONLINE"
    | "USERS"
    | "SEARCH"
    | "voiceCall"
    | "videoCall"
    | "inVoiceCall"
    | "inVideoCall"
    | "END_CALL";
  payload?: any;
};

type SocketContext = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const MyContext = createContext<SocketContext>({
  state: {
    newSocket: null,
    messages: [],
    isSearching: false,
    onlineUsers: null,
    users: null,
    search: "",
    voiceCall: undefined,
    videoCall: undefined,
    inVoiceCall: undefined,
    inVideoCall: undefined,
  },
  dispatch: () => {},
});

function socketReducer(state: State, action: Action) {
  switch (action.type) {
    // reducer logic goes here

    case "NEW_SOCKET":
      return { ...state, newSocket: action.payload };
    case "MESSAGES":
      return { ...state, messages: action.payload };
    case "NEW_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };
    case "ON":
      return { ...state, isSearching: true };
    case "OFF":
      return { ...state, isSearching: false };
    case "ONLINE":
      return { ...state, onlineUsers: action.payload };
    case "USERS":
      return { ...state, users: action.payload };
    case "SEARCH":
      return { ...state, search: action.payload };
    case "voiceCall":
      return { ...state, voiceCall: action.payload };
    case "videoCall":
      return { ...state, videoCall: action.payload };
    case "inVoiceCall":
      return { ...state, inVoiceCall: action.payload };
    case "inVideoCall":
      return { ...state, inVideoCall: action.payload };
    case "END_CALL":
      return {
        ...state,
        voiceCall: undefined,
        videoCall: undefined,
        inVoiceCall: undefined,
        inVideoCall: undefined,
      };
    default:
      return state;
  }
}

const INITIAL_STATE: State = {
  newSocket: null,
  messages: [],
  isSearching: false,
  onlineUsers: null,
  users: null,
  search: "",
  voiceCall: undefined,
  videoCall: undefined,
  inVoiceCall: undefined,
  inVideoCall: undefined,
};

export function MyContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(socketReducer, INITIAL_STATE);

  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {children}
    </MyContext.Provider>
  );
}

export const useSocket = () => useContext(MyContext);
