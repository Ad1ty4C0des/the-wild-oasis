import styled from "styled-components";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { formatCurrency } from "../../utils/helpers";
import { useApplyPricing } from "./useApplyPricing";
import { HiCheck, HiOutlineXMark } from "react-icons/hi2";

const CabinCell = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const Img = styled.img`
  display: block;
  width: 5.6rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  border-radius: var(--border-radius-sm);
`;

const CabinInfo = styled.div`
  display: flex;
  flex-direction: column;

  & span:first-child {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-grey-800);
  }

  & span:last-child {
    font-size: 1.15rem;
    color: var(--color-grey-500);
  }
`;

const PriceText = styled.span`
  font-weight: 600;
  color: var(--color-grey-700);
  font-size: 1.4rem;
`;

const SuggestedPriceText = styled.span`
  font-weight: 700;
  font-size: 1.5rem;
  color: ${(props) =>
    props.$isIncrease ? "var(--color-brand-600)" : "var(--color-red-700)"};
`;

const OccupancyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 90%;
`;

const OccupancyLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-grey-700);
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 0.7rem;
  background: var(--color-grey-200);
  border-radius: 100px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${(props) => props.$percentage}%;
  background: ${(props) => {
    if (props.$percentage >= 70) return "var(--color-brand-600)";
    if (props.$percentage >= 35) return "var(--color-yellow-700)";
    return "var(--color-red-700)";
  }};
  border-radius: 100px;
  transition: width 0.4s ease;
`;

const ReasoningBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  & p {
    font-size: 1.25rem;
    color: var(--color-grey-700);
    line-height: 1.4;
    margin: 0;
  }
`;

const FactorsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const FactorChip = styled.span`
  font-size: 1.05rem;
  background: var(--color-grey-100);
  color: var(--color-grey-600);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
`;

const ActionsCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const AppliedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-brand-600);
`;

function SmartPricingRow({ suggestion, analytics, onDismiss }) {
  const { applyPrice, isApplying } = useApplyPricing();

  const {
    cabinId,
    cabinName,
    currentPrice,
    suggestedPrice,
    changePercent,
    confidence,
    reasoning,
    factors = [],
  } = suggestion;

  const cabinAnalytics = analytics || {};
  const occupancyRate = cabinAnalytics.occupancyRate ?? 0;
  const isIncrease = suggestedPrice > currentPrice;
  const isIdentical = currentPrice === suggestedPrice;

  // Tag type mapping
  let tagType = "silver";
  if (changePercent > 0) tagType = "green";
  else if (changePercent < 0) tagType = "red";

  function handleApply() {
    applyPrice({ cabinId, newPrice: suggestedPrice });
  }

  return (
    <Table.Row>
      <CabinCell>
        {cabinAnalytics.image && (
          <Img src={cabinAnalytics.image} alt={`Cabin ${cabinName}`} />
        )}
        <CabinInfo>
          <span>Cabin {cabinName}</span>
          <span>Fits up to {cabinAnalytics.maxCapacity || 2} guests</span>
        </CabinInfo>
      </CabinCell>

      <PriceText>{formatCurrency(currentPrice)}</PriceText>

      <OccupancyContainer>
        <OccupancyLabel>
          <span>{occupancyRate}%</span>
          <span>{cabinAnalytics.totalBookings || 0} stays</span>
        </OccupancyLabel>
        <ProgressBar>
          <ProgressFill $percentage={Math.min(100, occupancyRate)} />
        </ProgressBar>
      </OccupancyContainer>

      <SuggestedPriceText $isIncrease={isIncrease || isIdentical}>
        {formatCurrency(suggestedPrice)}
      </SuggestedPriceText>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        <Tag type={tagType}>
          {changePercent > 0 ? `+${changePercent}%` : `${changePercent}%`}
        </Tag>
        <span
          style={{
            fontSize: "1.05rem",
            color: "var(--color-grey-500)",
            textTransform: "capitalize",
          }}
        >
          {confidence} conf.
        </span>
      </div>

      <ReasoningBox>
        <p>{reasoning}</p>
        {factors.length > 0 && (
          <FactorsList>
            {factors.map((f, i) => (
              <FactorChip key={i}>{f}</FactorChip>
            ))}
          </FactorsList>
        )}
      </ReasoningBox>

      <ActionsCell>
        {isIdentical ? (
          <AppliedBadge>
            <HiCheck /> Optimal
          </AppliedBadge>
        ) : (
          <Button
            size="small"
            variation="primary"
            onClick={handleApply}
            disabled={isApplying}
          >
            {isApplying ? <SpinnerMini /> : "Apply"}
          </Button>
        )}

        <Button
          size="small"
          variation="secondary"
          onClick={() => onDismiss(cabinId)}
          title="Dismiss suggestion"
          aria-label="Dismiss"
          style={{ padding: "0.6rem" }}
        >
          <HiOutlineXMark style={{ width: "1.4rem", height: "1.4rem" }} />
        </Button>
      </ActionsCell>
    </Table.Row>
  );
}

export default SmartPricingRow;
