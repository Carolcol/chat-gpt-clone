import styled, { keyframes } from "styled-components";
import { useChat } from "ai/react";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const flickerAnimation = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const ChatArea = styled.div`
  border: 1px solid black;
  position: relative;
  display: grid;
  grid-template-rows: 2fr 0.5fr;
  flex: 6;
`;

const UserInputContainer = styled.div`
  border: 1px solid black;
  position: absolute;
  bottom: 0;
`;

const Messages = styled.div`
  border: 1px solid black;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

type CursorProps = {
  isFlickering: boolean;
  isAssistant: boolean;
  isLastMessage: boolean;
};

const Cursor = styled.svg<CursorProps>`
  width: 1ch;
  animation: ${flickerAnimation} 0.5s infinite;
  margin-bottom: -2.5px;
  display: ${(props) =>
    props.isFlickering && props.isAssistant && props.isLastMessage
      ? "inline-block"
      : "none"};
`;

const ChatWindow = () => {
  const [isFlickering, setIsFlickering] = useState(false);
  const { messages, input, handleInputChange, append } = useChat();
  const messagesContainerEl = useRef<HTMLDivElement>(null);
  const messageEl = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = messagesContainerEl.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
    setIsFlickering(true);

    const timeoutId = setTimeout(() => {
      setIsFlickering(false);
    }, 1300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [messages, setIsFlickering]);

  const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    append({ content: input, role: "user", id: uuidv4() });
  };

  return (
    <ChatArea>
      <Messages ref={messagesContainerEl}>
        {messages.map((m, index) => (
          <div key={m.id} ref={messageEl}>
            {m.role}: {m.content}
            <Cursor
              isLastMessage={index === messages.length - 1}
              isFlickering={isFlickering}
              isAssistant={m.role === "assistant"}
              viewBox="8 4 8 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="10" y="6" width="4" height="12" fill="#292828" />
            </Cursor>
          </div>
        ))}
      </Messages>
      <UserInputContainer>
        <form onSubmit={handleInputSubmit}>
          <input value={input} onChange={handleInputChange} />
        </form>
      </UserInputContainer>
    </ChatArea>
  );
};

export default ChatWindow;
