import styled from 'styled-components';

const ButtonText = styled.button`
  color: var(--color-brand-600);
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 1.4rem;
  text-align: center;
  transition: all 0.2s ease;
  background: none;
  border: none;
  border-radius: var(--border-radius-sm);
  padding: 0.4rem 0.8rem;

  &:hover,
  &:active {
    color: var(--color-brand-700);
    background-color: var(--color-brand-50);
  }
`;

export default ButtonText;
