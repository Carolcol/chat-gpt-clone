import styled, { keyframes } from "styled-components";

import { useChat } from "ai/react";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import gptIcon from "../../public/download.jpg";
import userIcon from "../../public/user-icon.png";
import ReactMarkdown from "react-markdown";
import { CodeBlock } from "./CodeBlock";

const flickerAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

const ChatArea = styled.div`
  display: grid;
  grid-template-rows: 2fr 0.5fr;
  flex: 6;
`;

const UserInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

type MessageTextProps = {
  isAssistant: boolean;
};

const MessageWrapper = styled.div<MessageTextProps>`
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

const MessageContent = styled.div`
  width: 700px;
  display: flex;
  margin-right: 153px;
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
  margin-top: -10px;
`;

const InputIcon = styled.div`
  position: absolute;
  color: #c8c8c8;
  width: 13px;
  right: 2px;
  top: 13px;
`;

const UserInputWrapper = styled.div`
  position: relative;
  width: 35rem;
`;

const FlickeringTxt = styled.p`
  position: relative;
  :last-of-type::after {
    content: "";
    position: absolute;
    height: 100%;
    width: 8px;
    background-color: #292828;
    animation: ${flickerAnimation} 1s infinite;
    animation-fill-mode: forwards;
  }
`;

const Txt = styled.p`
  position: relative;
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
          <MessageWrapper
            ref={MessageSlot}
            key={m.id}
            isAssistant={m.role === "assistant"}
          >
            <MessageContent>
              <div>
                <Icon role={m.role} />
              </div>
              <Message>
                <ReactMarkdown
                  children={messages[index]?.content}
                  components={{
                    p({ children }) {
                      const lastIndex = messages.length - 1;
                      return index === lastIndex &&
                        m.role === "assistant" &&
                        isFlickering ? (
                        <FlickeringTxt>{children}</FlickeringTxt>
                      ) : (
                        <Txt>{children}</Txt>
                      );
                    },
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");

                      if (inline) {
                        return (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      }

                      return (
                        <CodeBlock
                          key={Math.random()}
                          language={(match && match[1]) || ""}
                          value={String(children).replace(/\n$/, "")}
                          {...props}
                        />
                      );
                    },
                  }}
                />
              </Message>
            </MessageContent>
          </MessageWrapper>
        ))}
      </Messages>
      <UserInputContainer>
        <UserInputWrapper>
          <Form onSubmit={handleInputSubmit}>
            <Input
              placeholder="Send a message"
              value={input}
              onChange={handleInputChange}
            />
            <InputIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="none"
                stroke-width="2"
              >
                <path
                  d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
                  fill="currentColor"
                ></path>
              </svg>
            </InputIcon>
          </Form>
        </UserInputWrapper>
      </UserInputContainer>
    </ChatArea>
  );
};

const GptChatIcon = styled.img`
  height: 22px;
`;

type IconProps = {
  role: string;
};

const Icon: React.FC<IconProps> = ({ role }) => {
  return (
    <GptChatIcon
      src={role === "assistant" ? gptIcon.src : userIcon.src}
      alt="chat gpt icon"
    />
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
