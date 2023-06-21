import styled from "styled-components";
import { useChat } from "ai/react";
import React, { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const ChatArea = styled.div`
  border: 1px solid black;
  position: relative;
  display: grid;
  grid-template-rows: 2fr 0.5fr;
  flex: 6;
`;

const UserInput = styled.div`
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

const ChatWindow = () => {
  const { messages, input, handleInputChange, append } = useChat();
  const messagesContainerEl = useRef<HTMLDivElement>(null);
  const messageEl = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = messagesContainerEl.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, messages);

  const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    append({ content: input, role: "user", id: uuidv4() });
  };

  return (
    <ChatArea>
      <Messages ref={messagesContainerEl}>
        {messages.map((m) => (
          <div key={m.id} ref={messageEl}>
            {m.role}: {m.content}
          </div>
        ))}
      </Messages>
      <UserInput>
        <form onSubmit={handleInputSubmit}>
          <input value={input} onChange={handleInputChange} />
        </form>
      </UserInput>
    </ChatArea>
  );
};

export default ChatWindow;
