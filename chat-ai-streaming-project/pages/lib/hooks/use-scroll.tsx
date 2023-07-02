import { Message } from "ai/react";
import { useEffect, RefObject } from "react";

export function useScroll(
  messageContainerEl: RefObject<HTMLDivElement>,
  messages: Message[]
) {
  useEffect(() => {
    const element = messageContainerEl.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [messages]);
}
