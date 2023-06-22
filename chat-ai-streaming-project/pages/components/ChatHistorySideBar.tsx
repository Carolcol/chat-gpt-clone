import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const SideBarNav = styled.div`
  flex: 1;
  padding: 4px;
  background-color: #1d2022;
`;

const SideBarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  height: 31px;
`;

const NewChat = styled.a`
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: grid;
  place-items: center;
  border-radius: 3px;
  flex: 3;
  margin-right: 4px;
  display: flex;
  padding: 15px;
  font-size: 12px;
`;

const NewChatText = styled.span`
  margin-left: 15px;
  font-size: 11px;
`;

const HideSideBar = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: grid;
  place-items: center;
  border-radius: 3px;
  width: 31px;
`;

const ChatHistorySideBar = () => {
  return (
    <SideBarNav>
      <SideBarHeader>
        <NewChat>
          <FontAwesomeIcon
            icon={faPlus}
            className="fa-sharp"
            style={{ color: "#ffffff" }}
            size="sm"
          />
          <NewChatText>New Chat</NewChatText>
        </NewChat>
        <HideSideBar>x</HideSideBar>
      </SideBarHeader>
    </SideBarNav>
  );
};

export default ChatHistorySideBar;
