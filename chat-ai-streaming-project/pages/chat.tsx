"use client";

import styled from "styled-components";
import ChatWindow from "./components/ChatWindow";
import ChatHistorySideBar from "./components/ChatHistorySideBar";

const Container = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  font-family: "Roboto", sans-serif;
`;

export default function Chat() {
  return (
    <Container>
      <ChatHistorySideBar />
      <ChatWindow />
    </Container>
  );
}
