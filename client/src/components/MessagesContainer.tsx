"use client";
import { Message } from "@/actions/getAllMessages";
import { User } from "@/actions/getCurrentUser";

import Scroller from "./Scroller";
import { useSocket } from "@/providers/MyProvider";
import { useEffect, useState } from "react";
import Image from "next/image";
import { THE_SERVER } from "@/libs/allRoutes";
import TextMessage from "./TextMessage";
import ImageMessage from "./ImageMessage";

type Props = { allMessages: Message[]; user: User; currentUser: User };

const MessagesContainer = ({ allMessages, user, currentUser }: Props) => {
  const { state, dispatch } = useSocket();

  useEffect(() => {
    dispatch({ type: "MESSAGES", payload: allMessages });
  }, [allMessages]);

  useEffect(() => {
    if (state.newSocket) {
      state.newSocket.on("msg-recieve", (data) => {
        dispatch({
          type: "NEW_MESSAGE",
          payload: {
            id: Date.now(),
            message: data.message,
            createdAt: Date.now(),
            type: data.type,
          },
        });
        console.log(state.messages);
      });
    }
  }, [state.newSocket]);

  if (allMessages.length === 0 && state.messages.length === 0)
    return (
      <div className="h-full flex items-center justify-center">No messages</div>
    );
  else if (state.messages.length === 0)
    return (
      <div className="h-full flex items-center justify-center">
        Please wait...
      </div>
    );

  return (
    <div className=" flex-1 relative overflow-y-auto myScroll p-4">
      {state.messages.map((message) => (
        <div
          key={message.id}
          className={`flex w-full ${
            currentUser?.id === message.senderId
              ? " justify-end"
              : "justify-start"
          } mb-2 `}
        >
          {/* text */}
          {message.type === "text" && (
            <TextMessage message={message} currentUser={currentUser} />
          )}
          {/* image */}
          {message.type === "image" && (
            <ImageMessage message={message} currentUser={currentUser} />
          )}
        </div>
      ))}
      <Scroller allMessages={allMessages} />
    </div>
  );
};

export default MessagesContainer;
