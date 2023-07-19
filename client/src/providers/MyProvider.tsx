'use client'
import { Message } from "@/actions/getAllMessages";
import { ReactNode, createContext, useContext, useReducer } from "react";
import { Socket } from "socket.io-client";

type State = {
  newSocket: Socket | null;
  messages: Message[] | [];
};

type Action = { type: "NEW_SOCKET" | "MESSAGES" | "NEW_MESSAGE"; payload: any };

type SocketContext = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const MyContext = createContext<SocketContext>({
  state: { newSocket: null, messages: [] },
  dispatch: () => {},
});

function socketReducer(state: State, action: Action) {
  switch (action.type) {
    // reducer logic goes here

    case "NEW_SOCKET": return {...state,newSocket:action.payload}
    case "MESSAGES": return {...state,messages:action.payload}
    case "NEW_MESSAGE" : return {...state,messages:[...state.messages,action.payload]}
    default:
      return state;
  }
}

export function MyContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(socketReducer, {
    newSocket: null,
    messages: [],
  });

  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {children}
    </MyContext.Provider>
  );
}




export const useSocket = ()=>useContext(MyContext)