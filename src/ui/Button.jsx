import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.6rem 1.2rem;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1rem 2rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.8rem;
    font-weight: 600;
  `,
};

const variations = {
  primary: css`
    color: #ffffff;
    background-color: var(--color-brand-600);
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.03),
      rgba(0, 0, 0, 0.02)
    );
    border: 1px solid transparent;

    &:hover {
      background-color: var(--color-brand-700);
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }

    &:active {
      transform: translateY(0);
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);
    }
  `,
  secondary: css`
    color: var(--color-grey-700);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
      border-color: var(--color-grey-300);
    }
  `,
  danger: css`
    color: #ffffff;
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
  accent: css`
    color: var(--color-accent-700);
    background: transparent;
    border: 1px solid var(--color-accent-500);

    &:hover {
      background-color: var(--color-accent-100);
    }
  `,
};

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
  font-family: "Inter", sans-serif;
  cursor: pointer;

  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]}
`;

Button.defaultProps = {
  variation: "primary",
  size: "medium",
};

export default Button;
