import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-family: "Hanken Grotesk", sans-serif;
      font-size: 3.2rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.2;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-family: "Hanken Grotesk", sans-serif;
      font-size: 2rem;
      font-weight: 600;
      line-height: 1.3;
    `}
    
    ${(props) =>
    props.as === "h3" &&
    css`
      font-family: "Hanken Grotesk", sans-serif;
      font-size: 1.8rem;
      font-weight: 600;
      line-height: 1.4;
    `}

    ${(props) =>
    props.as === "h4" &&
    css`
      font-family: "Hanken Grotesk", sans-serif;
      font-size: 2.8rem;
      font-weight: 600;
      text-align: center;
      line-height: 1.3;
    `}
    
  color: var(--color-grey-800);
`;

export default Heading;
