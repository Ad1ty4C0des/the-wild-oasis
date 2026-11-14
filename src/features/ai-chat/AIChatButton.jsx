import styled, { keyframes } from "styled-components";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { useState } from "react";
import AIChatWindow from "./AIChatWindow";

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.45);
  }
  70% {
    box-shadow: 0 0 0 14px rgba(22, 163, 74, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(22, 163, 74, 0);
  }
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 2.4rem;
  right: 2.4rem;
  width: 5.6rem;
  height: 5.6rem;
  border-radius: 50%;
  background: var(--color-brand-600);
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-lg);
  z-index: 999;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  animation: ${pulse} 2.5s infinite;

  &:hover {
    background: var(--color-brand-700);
    transform: scale(1.08);
    animation: none;
  }

  &:active {
    transform: scale(0.95);
  }

  & svg {
    width: 2.6rem;
    height: 2.6rem;
  }
`;

const OnlineDot = styled.span`
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
  width: 1.2rem;
  height: 1.2rem;
  background-color: #22c55e;
  border: 2px solid var(--color-grey-0);
  border-radius: 50%;
`;

function AIChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <FloatingButton
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle AI Hotel Assistant"
        title="Chat with AI Hotel Assistant"
      >
        <HiOutlineChatBubbleLeftRight />
        <OnlineDot />
      </FloatingButton>
      {isOpen && <AIChatWindow onClose={() => setIsOpen(false)} />}
    </>
  );
}

export default AIChatButton;
