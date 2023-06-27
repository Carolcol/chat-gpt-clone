import { FC, memo } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface Props {
  language: string;
  value: string;
}

const CodeBlock: FC<Props> = memo(({ language, value }) => {
  return (
    <div className="codeblock relative w-full bg-zinc-950 font-sans">
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
    </div>
  );
});

export { CodeBlock };
