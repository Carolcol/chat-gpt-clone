import { FC, memo, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import styled from "styled-components";
import { useCopyToClipBoard } from "../lib/hooks/use-copy-to-clipboard";

const CodeContainer = styled.div`
  max-width: 570px;
  min-width: 570px;
  overflow-x: auto;
  background-color: black;
  border-radius: 5px;
`;

const CodeBlockHeader = styled.div`
  background-color: rgba(52, 53, 65, 1);
  height: 10px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const Language = styled.span`
  color: #d5d5d5;
`;

const CopyCodeBtn = styled.button`
  background-color: rgba(52, 53, 65, 1);
  appearance: none;
  border: none;
  display: flex;
  justify-content: space-between;
  gap: 5px;
  font-size: 12px;
  color: #d5d5d5;
`;

type CopyCodeProps = {
  value: string;
};

interface Props {
  language: string;
  value: string;
}

const CopyCode: React.FC<CopyCodeProps> = ({ value }) => {
  const { isCopied, copyToClipboard } = useCopyToClipBoard({ value });
  return isCopied ? (
    <CopyCodeBtn>
      <svg
        stroke="currentColor"
        fill="none"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke-linecap="round"
        stroke-linejoin="round"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      Copied!
    </CopyCodeBtn>
  ) : (
    <CopyCodeBtn onClick={copyToClipboard}>
      <svg
        stroke="currentColor"
        fill="none"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke-linecap="round"
        stroke-linejoin="round"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
      </svg>
      Copy code
    </CopyCodeBtn>
  );
};

const CodeBlock: FC<Props> = memo(({ language, value }) => {
  return (
    <CodeContainer>
      <CodeBlockHeader>
        <Language>{language}</Language>
        <CopyCode value={value} />
      </CodeBlockHeader>
      <SyntaxHighlighter
        language={language}
        style={coldarkDark}
        PreTag="div"
        customStyle={{
          background: "black",
        }}
      >
        {value}
      </SyntaxHighlighter>
    </CodeContainer>
  );
});

export { CodeBlock };
