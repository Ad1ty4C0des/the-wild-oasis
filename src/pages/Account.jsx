import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import styled from "styled-components";

const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Subtitle = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 1.4rem;
  color: var(--color-grey-500);
`;

function Account() {
  return (
    <>
      <PageHeader>
        <Heading as="h1">Your Account</Heading>
        <Subtitle>Manage your personal details and security settings.</Subtitle>
      </PageHeader>

      <Row>
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">Update password</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
