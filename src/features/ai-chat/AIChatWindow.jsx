import styled, { keyframes } from "styled-components";
import {
  HiOutlineXMark,
  HiOutlinePaperAirplane,
  HiOutlineSparkles,
} from "react-icons/hi2";
import { useState, useRef, useEffect } from "react";
import { sendChatMessage } from "../../services/apiChat";

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ChatContainer = styled.div`
  position: fixed;
  bottom: 9.6rem;
  right: 2.4rem;
  width: 42rem;
  max-height: 58rem;
  background: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-grey-200);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  animation: ${slideUp} 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;

  @media (max-width: 600px) {
    width: calc(100vw - 3.2rem);
    right: 1.6rem;
    bottom: 8.8rem;
    max-height: 75vh;
  }
`;

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 2rem;
  background: var(--color-brand-600);
  color: #fff;

  & h3 {
    font-size: 1.5rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin: 0;
  }
`;

const HeaderBadge = styled.span`
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.2rem 0.8rem;
  border-radius: 1.2rem;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.4rem;
  border-radius: 50%;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  & svg {
    width: 2rem;
    height: 2rem;
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  min-height: 30rem;
  max-height: 38rem;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--color-grey-300);
    border-radius: 3px;
  }
`;

const Message = styled.div`
  padding: 1rem 1.4rem;
  border-radius: var(--border-radius-md);
  font-size: 1.3rem;
  line-height: 1.6;
  max-width: 85%;
  white-space: pre-wrap;
  word-wrap: break-word;

  ${(props) =>
    props.$isUser
      ? `
    align-self: flex-end;
    background: var(--color-brand-600);
    color: #fff;
    border-bottom-right-radius: 3px;
  `
      : `
    align-self: flex-start;
    background: var(--color-grey-100);
    color: var(--color-grey-800);
    border-bottom-left-radius: 3px;
    border: 1px solid var(--color-grey-200);
  `}
`;

const dotBounce = keyframes`
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-6px); }
`;

const TypingDots = styled.div`
  display: flex;
  gap: 5px;
  padding: 1.2rem 1.6rem;
  align-self: flex-start;
  background: var(--color-grey-100);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-grey-200);

  & span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-brand-600);
    animation: ${dotBounce} 1.2s infinite ease-in-out;
  }
  & span:nth-child(2) {
    animation-delay: 0.15s;
  }
  & span:nth-child(3) {
    animation-delay: 0.3s;
  }
`;

const InputArea = styled.form`
  display: flex;
  gap: 0.8rem;
  padding: 1.2rem 1.6rem;
  border-top: 1px solid var(--color-grey-200);
  background: var(--color-grey-50);
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 0.9rem 1.4rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background: var(--color-grey-0);
  color: var(--color-grey-800);
  font-size: 1.3rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: var(--color-brand-600);
  }
  &::placeholder {
    color: var(--color-grey-400);
  }
`;

const SendButton = styled.button`
  background: var(--color-brand-600);
  color: #fff;
  border: none;
  border-radius: var(--border-radius-sm);
  padding: 0.9rem 1.4rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, transform 0.1s;

  &:hover:not(:disabled) {
    background: var(--color-brand-700);
  }
  &:active:not(:disabled) {
    transform: scale(0.96);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  & svg {
    width: 1.8rem;
    height: 1.8rem;
  }
`;

const WelcomeMessage = styled.div`
  text-align: center;
  padding: 2.4rem 1.2rem;
  color: var(--color-grey-500);

  & h4 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-grey-800);
    margin-bottom: 0.6rem;
  }
  & p {
    font-size: 1.25rem;
    line-height: 1.5;
  }
`;

const SuggestionChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.6rem;
  justify-content: center;
`;

const Chip = styled.button`
  background: var(--color-brand-50);
  color: var(--color-brand-700);
  border: 1px solid var(--color-brand-200);
  border-radius: 1.6rem;
  padding: 0.5rem 1.1rem;
  font-size: 1.15rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;

  &:hover {
    background: var(--color-brand-100);
    border-color: var(--color-brand-600);
    transform: translateY(-1px);
  }
`;

const SUGGESTIONS = [
  "Who's checking in today?",
  "What's our current occupancy rate?",
  "Which cabins have highest price?",
  "Any unconfirmed bookings?",
];

function AIChatWindow({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  async function handleSend(e, prefillText = null) {
    if (e) e.preventDefault();
    const text = prefillText || input.trim();
    if (!text || isLoading) return;

    const userMsg = { role: "user", text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const history = messages.map((m) => ({ role: m.role, text: m.text }));
      const response = await sendChatMessage(text, history);
      setMessages((prev) => [...prev, { role: "assistant", text: response }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "I'm having trouble retrieving hotel records right now. Please try again shortly.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ChatContainer>
      <ChatHeader>
        <h3>
          <HiOutlineSparkles /> AI Operations Assistant
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
          
          <CloseButton onClick={onClose} aria-label="Close Chat">
            <HiOutlineXMark />
          </CloseButton>
        </div>
      </ChatHeader>

      <MessagesContainer>
        {messages.length === 0 && (
          <WelcomeMessage>
            <h4>👋 Welcome to Wild Oasis Assistant</h4>
            <p>Ask real-time questions regarding live bookings, cabin rates, guests, or today's arrivals.</p>
            <SuggestionChips>
              {SUGGESTIONS.map((s) => (
                <Chip key={s} type="button" onClick={(e) => handleSend(e, s)}>
                  {s}
                </Chip>
              ))}
            </SuggestionChips>
          </WelcomeMessage>
        )}

        {messages.map((msg, i) => (
          <Message key={i} $isUser={msg.role === "user"}>
            {msg.text}
          </Message>
        ))}

        {isLoading && (
          <TypingDots>
            <span />
            <span />
            <span />
          </TypingDots>
        )}

        <div ref={messagesEndRef} />
      </MessagesContainer>

      <InputArea onSubmit={handleSend}>
        <ChatInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about guests, check-ins, prices..."
          disabled={isLoading}
        />
        <SendButton type="submit" disabled={!input.trim() || isLoading} aria-label="Send Message">
          <HiOutlinePaperAirplane />
        </SendButton>
      </InputArea>
    </ChatContainer>
  );
}

export default AIChatWindow;

