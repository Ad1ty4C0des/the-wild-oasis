import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
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

function Cabins() {
  return (
    <>
      <PageHeader>
        <HeaderLeft>
          <Heading as="h1">Cabin Resources</Heading>
          <Subtitle>Manage your property's accommodations and track current status.</Subtitle>
        </HeaderLeft>
        <CabinTableOperations />
      </PageHeader>

      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
