import styled from "styled-components";

const Textarea = styled.textarea`
  padding: 1rem 1.4rem;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  box-shadow: none;
  width: 100%;
  height: 8rem;
  font-family: "Inter", sans-serif;
  font-size: 1.4rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--color-brand-600);
    box-shadow: 0 0 0 3px rgba(27, 67, 50, 0.1);
  }

  &::placeholder {
    color: var(--color-grey-400);
  }
`;

export default Textarea;
