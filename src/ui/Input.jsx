import styled from "styled-components";

const Input = styled.input`
  border: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 1rem 1.4rem;
  box-shadow: none;
  transition: all 0.2s ease;
  font-size: 1.4rem;

  &:focus {
    outline: none;
    border-color: var(--color-brand-600);
    box-shadow: 0 0 0 3px rgba(27, 67, 50, 0.1);
  }

  &::placeholder {
    color: var(--color-grey-400);
  }
`;

export default Input;
