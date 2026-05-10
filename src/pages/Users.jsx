import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";
import styled from "styled-components";

const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
`;

const Subtitle = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 1.4rem;
  color: var(--color-grey-500);
  text-align: center;
`;

function NewUsers() {
  return (
    <>
      <PageHeader>
        <Heading as="h1">Create New User</Heading>
        <Subtitle>Add a new staff member to the system to grant management access.</Subtitle>
      </PageHeader>
      <SignupForm />
    </>
  );
}

export default NewUsers;
