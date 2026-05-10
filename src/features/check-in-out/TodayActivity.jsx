import styled from "styled-components";

import Heading from "../../ui/Heading";
import { useTodaActivity } from "./useTodayActivity";
import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";

const StyledToday = styled.div`
  /* Bento Card */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-xl);

  padding: 2.4rem 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;

  @media (max-width: 1200px) {
    grid-column: 1 / -1;
  }

  @media (max-width: 600px) {
    padding: 2rem 2rem;
  }
`;

const TodayHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ViewAll = styled.span`
  font-family: "Inter", sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-grey-500);
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: var(--color-brand-600);
  }
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-500);
  margin-top: 0.8rem;
`;

function TodayActivity() {
  const { isLoading, activities } = useTodaActivity();

  return (
    <StyledToday>
      <TodayHeader>
        <Heading as="h2">Today's Activity</Heading>
        <ViewAll>View All</ViewAll>
      </TodayHeader>

      {!isLoading ? (
        activities?.length > 0 ? (
          <TodayList>
            {activities.map((activity) => (
              <TodayItem activity={activity} key={activity.id} />
            ))}
          </TodayList>
        ) : (
          <NoActivity>No activity today...</NoActivity>
        )
      ) : (
        <Spinner />
      )}
    </StyledToday>
  );
}

export default TodayActivity;
