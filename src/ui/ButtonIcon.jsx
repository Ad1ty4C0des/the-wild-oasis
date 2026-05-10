import styled from "styled-components";

const ButtonIcon = styled.button`
  background: none;
  border: none;
  padding: 0.8rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-grey-500);
    transition: color 0.2s ease;
  }

  &:hover svg {
    color: var(--color-grey-700);
  }
`;

export default ButtonIcon;
