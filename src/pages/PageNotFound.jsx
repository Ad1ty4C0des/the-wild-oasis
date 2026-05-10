import styled from "styled-components";
import { useMoveBack } from "../hooks/useMoveBack";
import Heading from "../ui/Heading";
import Button from "../ui/Button";

const StyledPageNotFound = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* Bento Card */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-xl);
  padding: 4.8rem;
  flex: 0 1 64rem;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: "Inter", sans-serif;
    margin-bottom: 3.2rem;
    color: var(--color-grey-500);
    font-size: 1.4rem;
  }
`;

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <StyledPageNotFound>
      <Box>
        <Heading as="h1">
          The page you are looking for could not be found 🔍
        </Heading>
        <p>It might have been removed, or the URL may be incorrect.</p>
        <Button onClick={moveBack} size="large">
          &larr; Go back
        </Button>
      </Box>
    </StyledPageNotFound>
  );
}

export default PageNotFound;
