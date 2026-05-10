import styled from "styled-components";

const Tag = styled.span`
  width: fit-content;
  text-transform: capitalize;
  font-family: "Inter", sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: transform 0.2s ease, background-color 0.2s ease;

  /* Status dot */
  &::before {
    content: "";
    display: inline-block;
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    background-color: var(--color-${(props) => props.type}-700);
  }

  /* Make these dynamic, based on the received prop */
  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);
`;

export default Tag;
