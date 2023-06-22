import styled, { keyframes } from "styled-components";
import { useChat } from "ai/react";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import gptIcon from "../../public/download.jpg";

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
  display: grid;
  grid-template-rows: 2fr 0.5fr;
  flex: 6;
`;

const UserInputContainer = styled.div`
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type MessageTextProps = {
  isAssistant: boolean;
};

const MessageText = styled.div<MessageTextProps>`
  background-color: ${(props) =>
    props.isAssistant ? "rgba(247,247,248)" : "#ffffff"};
  min-height: 50px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.1);
  display: flex;
  justify-content: center;
  height: auto;
  padding: 10px;
  font-size: 13px;
  color: #4a4949;
`;
const Messages = styled.div`
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

type CursorProps = {
  isFlickerActive: boolean;
};

const Input = styled.input`
  height: 25px;
  overflow-y: hidden;
  width: 100%;
  border-radius: 5px;
  border: 1px solid rgba(128, 128, 128, 0.3);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  :focus {
    outline: none;
  }
  padding: 8px;
  ::placeholder {
    color: #999;
  }
`;

const Text = styled.div`
  width: 400px;
  display: flex;
`;

const Form = styled.form`
  width: 35rem;
`;
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

const Message = styled.span`
  margin-left: 11px;
`;
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
            <Text>
              <div>{m.role === "assistant" ? <Icon /> : m.role + ":"}</div>
              <Message>
                {messages[index]?.content}
                <Flicker
                  isFlickering={isFlickering}
                  isAssistantNewMessage={
                    m.role === "assistant" && index === messagesCopy.length - 1
                  }
                />
              </Message>
            </Text>
          </MessageText>
        ))}
      </Messages>
      <UserInputContainer>
        <Form onSubmit={handleInputSubmit}>
          <Input
            placeholder="Send a message"
            value={input}
            onChange={handleInputChange}
          />
        </Form>
      </UserInputContainer>
    </ChatArea>
  );
};

const GptChatIcon = styled.img`
  height: 22px;
`;
const Icon = () => {
  return <GptChatIcon src={gptIcon.src} alt="chat gpt icon" />;
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
