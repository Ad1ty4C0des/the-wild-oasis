import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: left;
  padding: 0.8rem 0.8rem 0;
`;

const BrandName = styled.h1`
  font-family: "Hanken Grotesk", sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-grey-800);
  line-height: 1.2;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.span`
  font-family: "Inter", sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-grey-400);
  display: block;
  margin-top: 0.2rem;
`;

function Logo() {
  return (
    <StyledLogo>
      <BrandName>The Wild Oasis</BrandName>
      <Subtitle>Management Suite</Subtitle>
    </StyledLogo>
  );
}

export default Logo;
