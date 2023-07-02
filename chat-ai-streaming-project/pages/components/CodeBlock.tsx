import { FC, memo } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import styled from "styled-components";

interface Props {
  language: string;
  value: string;
}

const CodeContainer = styled.div`
  max-width: 570px;
  overflow-x: auto;
`;

const CodeBlock: FC<Props> = memo(({ language, value }) => {
  return (
    <CodeContainer>
      <SyntaxHighlighter
        language={language}
        style={coldarkDark}
        PreTag="div"
        showLineNumbers
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
