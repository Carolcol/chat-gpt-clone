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

type MessageTextProps = {
  isAssistant: boolean;
};

const MessageText = styled.div<MessageTextProps>`
  background-color: ${(props) =>
    props.isAssistant ? "rgba(247,247,248)" : "#ffffff"};
  height: 60px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.1);
`;
const Messages = styled.div`
  border: 1px solid black;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

type CursorProps = {
  isFlickerActive: boolean;
};

const Cursor = styled.svg<CursorProps>`
  width: 1ch;
  animation: ${flickerAnimation} 0.5s infinite;
  margin-bottom: -2.5px;
  display: ${(props) => (props.isFlickerActive ? "inline-block" : "none")};
`;
type Message = {
  content?: string;
  role: string;
  id?: string;
};
const ChatWindow = () => {
  const [isFlickering, setIsFlickering] = useState(false);
  const { messages, input, handleInputChange, append } = useChat();
  const [messagesCopy, setMessagesCopy] = useState<Message[]>(messages);
  const messagesContainerEl = useRef<HTMLDivElement>(null);
  const MessageSlot = useRef<HTMLDivElement>(null);

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
  }, [messages]);
  const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessagesCopy([
      ...messages,
      { content: input, role: "user", id: uuidv4() },
      { role: "assistant", id: uuidv4() },
    ]);

    append({ content: input, role: "user", id: uuidv4() });
  };

  return (
    <ChatArea>
      <Messages ref={messagesContainerEl}>
        {messagesCopy.map((m, index) => (
          <MessageText
            ref={MessageSlot}
            key={m.id}
            isAssistant={m.role === "assistant"}
          >
            {m.role} :{messages[index]?.content}
            <Flicker
              isFlickering={isFlickering}
              isAssistantNewMessage={
                m.role === "assistant" && index === messagesCopy.length - 1
              }
            />
          </MessageText>
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

type FlickerProps = {
  isFlickering: boolean;
  isAssistantNewMessage?: boolean;
  isLoadingData?: boolean;
};

const Flicker: React.FC<FlickerProps> = ({
  isFlickering,
  isAssistantNewMessage,
  isLoadingData,
}) => {
  var isFlickerActive =
    (isFlickering && !!isAssistantNewMessage) || !!isLoadingData;
  return (
    <Cursor
      isFlickerActive={isFlickerActive}
      viewBox="8 4 8 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="10" y="6" width="4" height="12" fill="#292828" />
    </Cursor>
  );
};

export default ChatWindow;
