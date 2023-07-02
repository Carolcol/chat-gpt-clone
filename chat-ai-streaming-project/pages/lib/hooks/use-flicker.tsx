import { useEffect } from "react";
import { Message } from "ai/react";

export function useFlicker(
  setIsFlickering: React.Dispatch<React.SetStateAction<boolean>>,
  messages: Message[]
) {
  useEffect(() => {
    setIsFlickering(true);

    const timeoutId = setTimeout(() => {
      setIsFlickering(false);
    }, 1300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [messages]);
}
