import styled from "styled-components";

const DashboardBox = styled.div`
  /* Bento Card */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-xl);

  padding: 2.4rem 3.2rem;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  @media (max-width: 600px) {
    padding: 2rem 2rem;
  }
`;

export default DashboardBox;
