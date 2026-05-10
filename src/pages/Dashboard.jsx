import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import styled from "styled-components";

const DashboardPage = styled.div`
  /* Dashboard uses warm cream tertiary background */
  margin: -3.2rem -4rem -4.8rem;
  padding: 3.2rem 4rem 4.8rem;
  background-color: var(--color-tertiary-bg);
  min-height: 100%;
`;

const PageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 2.4rem;
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

function Dashboard() {
  return (
    <DashboardPage>
      <PageHeader>
        <HeaderLeft>
          <Heading as="h1">Overview</Heading>
          <Subtitle>Welcome back. Here's what's happening at the oasis today.</Subtitle>
        </HeaderLeft>
        <DashboardFilter />
      </PageHeader>

      <DashboardLayout />
    </DashboardPage>
  );
}

export default Dashboard;
