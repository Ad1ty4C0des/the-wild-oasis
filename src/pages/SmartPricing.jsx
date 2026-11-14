import styled from "styled-components";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import SmartPricingTable from "../features/smart-pricing/SmartPricingTable";

const PageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.6rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
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

function SmartPricing() {
  return (
    <>
      <PageHeader>
        <HeaderLeft>
          <Heading as="h1">AI Smart Pricing</Heading>
          <Subtitle>
            Dynamic yield management powered by Gemini 3.5 Flash Lite analyzing historical booking patterns.
          </Subtitle>
        </HeaderLeft>
      </PageHeader>

      <Row>
        <SmartPricingTable />
      </Row>
    </>
  );
}

export default SmartPricing;
