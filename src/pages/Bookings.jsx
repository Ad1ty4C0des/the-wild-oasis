import Heading from "../ui/Heading";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
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

function Bookings() {
  return (
    <>
      <PageHeader>
        <HeaderLeft>
          <Heading as="h1">Bookings</Heading>
          <Subtitle>Manage the guest lifecycle, reservations, and current stays.</Subtitle>
        </HeaderLeft>
        <BookingTableOperations />
      </PageHeader>

      <BookingTable />
    </>
  );
}

export default Bookings;
