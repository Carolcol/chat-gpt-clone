import styled, { keyframes } from "styled-components";
import { useChat } from "ai/react";
import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import gptIcon from "../../public/gpt-icon.jpg";
import userIcon from "../../public/user-icon.png";
import ReactMarkdown from "react-markdown";
import { CodeBlock } from "./CodeBlock";
import { useScroll } from "../lib/hooks/use-scroll";
import { useFlicker } from "../lib/hooks/use-flicker";

const flickerAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

const ChatArea = styled.div`
  display: grid;
  grid-template-rows: 2fr 0.5fr;
  flex: 6;
  height: 100vh;
`;

const GptChatIcon = styled.img`
  height: 22px;
`;

const UserInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const MessageWrapper = styled.div<MessageTextProps>`
  background-color: ${(props) =>
    props.isAssistant ? "rgba(247,247,248)" : "#ffffff"};
  min-height: 50px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.1);
  display: flex;
  justify-content: center;
  height: auto;
  padding: 17px;
  font-size: 13px;
  color: #4a4949;
`;

const Messages = styled.div`
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Input = styled.input`
  height: 27px;
  overflow-y: hidden;
  width: 100%;
  border-radius: 7px;
  border: 1px solid rgba(128, 128, 128, 0.3);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  :focus {
    outline: none;
  }
  padding: 8px;
  ::placeholder {
    color: #999;
  }
  margin-bottom: 40px;
`;

const MessageContent = styled.div`
  width: 600px;
  overflow-wrap: break-word;
  display: flex;
  margin-right: 15px;
`;

const Form = styled.form`
  position: relative;
  width: 610px;
  margin-top: 57px;
`;

const Cursor = styled.svg`
  height: 100%;
  width: 8px;
  background-color: #292828;
  animation: ${flickerAnimation} 1s infinite;
  animation-fill-mode: forwards;
`;

const Message = styled.span`
  margin-left: 16px;
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
  width: 100%;
  display: flex;
  justify-content: center;
`;

const FlickeringTxt = styled.p<FlickeringTxtProps>`
  position: relative;
  :last-of-type::after {
    content: "";
    display: ${(props) => (props.isTypingCode ? "none" : "inline")};
    position: absolute;
    height: 14px;
    width: 8px;
    background-color: #292828;
    animation: ${flickerAnimation} 1s infinite;
    animation-fill-mode: forwards;
  }
`;

const Txt = styled.p`
  position: relative;
`;

type MessageTextProps = {
  isAssistant: boolean;
};

type Message = {
  content?: string;
  role: string;
  id?: string;
};

type FlickeringTxtProps = {
  isTypingCode: boolean;
};

type IconProps = {
  role: string;
};

type UserInputProps = {
  handleInputSubmit: (e: any) => void;
  handleInputChange: (e: any) => void;
  input: string;
};

const UserInput: React.FC<UserInputProps> = ({
  handleInputSubmit,
  handleInputChange,
  input,
}) => {
  return (
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
  );
};

const ChatWindow = () => {
  const [isFlickering, setIsFlickering] = useState(false);
  const { messages, input, handleInputChange, append, setInput } = useChat();
  const [messagesCopy, setMessagesCopy] = useState<Message[]>(messages);
  const messagesContainerEl = useRef<HTMLDivElement>(null);
  const [isTypingCode, setIsTypingCode] = useState(false);
  useScroll(messagesContainerEl, messages);
  useFlicker(setIsFlickering, messages);

  const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessagesCopy([
      ...messages,
      { content: input, role: "user", id: uuidv4() },
      { role: "assistant", id: uuidv4() },
    ]);

    append({ content: input, role: "user", id: uuidv4() });
    setInput("");
  };

  return (
    <ChatArea>
      <Messages ref={messagesContainerEl}>
        {messagesCopy.map((m, index) => (
          <MessageWrapper key={m.id} isAssistant={m.role === "assistant"}>
            <MessageContent>
              <div>
                <Icon role={m.role} />
              </div>
              <Message>
                <p>
                  {m.role === "assistant" && !messages[index]?.content ? (
                    <Flicker />
                  ) : null}
                </p>

                <ReactMarkdown
                  children={messages[index]?.content}
                  components={{
                    p({ children }) {
                      setIsTypingCode(false);
                      const lastIndex = messages.length - 1;
                      return index === lastIndex &&
                        m.role === "assistant" &&
                        isFlickering ? (
                        <FlickeringTxt isTypingCode={isTypingCode}>
                          {children}
                        </FlickeringTxt>
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
                      setIsTypingCode(true);

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
      <UserInput
        handleInputSubmit={handleInputSubmit}
        handleInputChange={handleInputChange}
        input={input}
      />
    </ChatArea>
  );
};

const Icon: React.FC<IconProps> = ({ role }) => {
  return (
    <GptChatIcon
      src={role === "assistant" ? gptIcon.src : userIcon.src}
      alt="chat gpt icon"
    />
  );
};

const Flicker = () => {
  return (
    <Cursor viewBox="8 4 8 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="6" width="4" height="12" fill="#292828" />
    </Cursor>
  );
};

export default ChatWindow;
