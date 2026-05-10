import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";
import styled from "styled-components";

const PageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Subtitle = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 1.4rem;
  color: var(--color-grey-500);
`;

function Settings() {
  return (
    <>
      <PageHeader>
        <HeaderLeft>
          <Heading as="h1">Settings</Heading>
          <Subtitle>Manage your property details, configurations, and team preferences.</Subtitle>
        </HeaderLeft>
      </PageHeader>
      <UpdateSettingsForm />
    </>
  );
}

export default Settings;
