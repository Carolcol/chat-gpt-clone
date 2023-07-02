import { useState } from "react";

type CopyToClipBoardProps = {
  value: string;
};
export function useCopyToClipBoard({ value }: CopyToClipBoardProps) {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return { isCopied, copyToClipboard };
}
