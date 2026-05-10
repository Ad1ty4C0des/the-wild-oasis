import { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { HiChevronDown } from "react-icons/hi2";

/* ── Animations ── */
const dropIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px) scaleY(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scaleY(1);
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Trigger = styled.button`
  font-family: "Inter", sans-serif;
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0.8rem 1.2rem;
  padding-right: 3.6rem;
  border: 1px solid
    ${(props) =>
      props.$type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-200)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  text-align: left;
  min-width: 22rem;

  &:hover {
    border-color: var(--color-grey-300);
  }

  &:focus {
    outline: none;
    border-color: var(--color-brand-600);
    box-shadow: 0 0 0 3px rgba(27, 67, 50, 0.1);
  }
`;

const ChevronIcon = styled.span`
  position: absolute;
  right: 1.2rem;
  top: 50%;
  transform: translateY(-50%)
    rotate(${(props) => (props.$isOpen ? "180deg" : "0deg")});
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  align-items: center;
  pointer-events: none;
  color: var(--color-grey-400);

  & svg {
    width: 1.8rem;
    height: 1.8rem;
  }
`;

const DropdownPanel = styled.ul`
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 100%;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  z-index: 50;
  list-style: none;
  padding: 0.4rem 0;

  animation: ${dropIn} 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  transform-origin: top center;
`;

const Option = styled.li`
  font-family: "Inter", sans-serif;
  font-size: 1.3rem;
  font-weight: 500;
  padding: 1rem 1.6rem;
  cursor: pointer;
  color: var(--color-grey-600);
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  white-space: nowrap;

  background-color: ${(props) =>
    props.$active ? "var(--color-brand-50)" : "transparent"};
  color: ${(props) =>
    props.$active ? "var(--color-brand-600)" : "var(--color-grey-600)"};
  font-weight: ${(props) => (props.$active ? "600" : "500")};

  &:hover {
    background-color: ${(props) =>
      props.$active ? "var(--color-brand-50)" : "var(--color-grey-50)"};
    color: ${(props) =>
      props.$active ? "var(--color-brand-600)" : "var(--color-grey-800)"};
  }
`;

const ActiveDot = styled.span`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: var(--color-brand-600);
  flex-shrink: 0;
`;

function Select({ options, value, onChange, type, ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") setIsOpen(false);
    }
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || options[0]?.label;

  function handleSelect(optionValue) {
    // Mimic native onChange event shape
    onChange({ target: { value: optionValue } });
    setIsOpen(false);
  }

  return (
    <Wrapper ref={wrapperRef} {...props}>
      <Trigger
        $type={type}
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
      >
        {selectedLabel}
      </Trigger>
      <ChevronIcon $isOpen={isOpen}>
        <HiChevronDown />
      </ChevronIcon>

      {isOpen && (
        <DropdownPanel>
          {options.map((option) => (
            <Option
              key={option.value}
              $active={option.value === value}
              onClick={() => handleSelect(option.value)}
            >
              {option.value === value && <ActiveDot />}
              {option.label}
            </Option>
          ))}
        </DropdownPanel>
      )}
    </Wrapper>
  );
}

export default Select;
