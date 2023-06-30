import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const SideBarNav = styled.div`
  padding: 6px;
  width: 196px;
  background-color: #1d2022;
`;

const SideBarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  height: 36px;
`;

const NewChat = styled.a`
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: grid;
  place-items: center;
  border-radius: 3px;
  flex: 3;
  margin-right: 6px;
  display: flex;
  padding: 15px;
  font-size: 12px;
`;

const NewChatText = styled.span`
  margin-left: 9px;
  font-size: 11px;
`;

const HideSideBar = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: grid;
  place-items: center;
  border-radius: 3px;
  width: 34px;
`;

const Date = styled.div`
  color: #9a9a9a;
  padding: 10px;
  font-size: 10px;
  margin-top: 2px;
`;

const ChatHistory = styled.div`
  color: rgb(255, 255, 255);
  background-color: rgba(52, 53, 65, 1);
  border-radius: 3px;
  padding: 5px 8px;
  font-size: 12px;
  height: 25px;
  display: grid;
`;

const Chat = styled.div`
  display: flex;
  align-items: center;
`;

const ChatName = styled.span`
  margin-left: 8px;
  font-size: 11px;
`;

const FontAwesomePlusIcon = styled(FontAwesomeIcon)`
  margin-left: -2px;
`;

const History = styled.div``;
const ChatHistorySideBar = () => {
  return (
    <SideBarNav>
      <SideBarHeader>
        <NewChat>
          <FontAwesomePlusIcon
            icon={faPlus}
            className="fa-sharp"
            style={{ color: "#ffffff" }}
            size="sm"
          />
          <NewChatText>New chat</NewChatText>
        </NewChat>
        <HideSideBar>
          <svg
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            height="0.75em"
            width="0.75em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="2"
              ry="2"
              stroke="#FFFFFF"
              fill="none"
              stroke-width="2px"
            ></rect>
            <line
              x1="9"
              y1="3"
              x2="9"
              y2="21"
              stroke="#FFFFFF"
              fill="none"
              stroke-width="2px"
            ></line>
          </svg>
        </HideSideBar>
      </SideBarHeader>
      <History>
        <Date>
          <span>Today</span>
        </Date>
        <ChatHistory>
          <Chat>
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
            >
              <path
                d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                stroke="#ECECF1"
                fill="none"
                strokeWidth="2px"
              ></path>
            </svg>
            <ChatName>New chat</ChatName>
          </Chat>
        </ChatHistory>
      </History>
    </SideBarNav>
  );
};
export default ChatHistorySideBar;
