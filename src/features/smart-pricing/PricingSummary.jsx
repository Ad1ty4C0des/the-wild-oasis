import styled from "styled-components";
import {
  HiOutlineSparkles,
  HiOutlineArrowPath,
} from "react-icons/hi2";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin-bottom: 2.4rem;
`;

const Banner = styled.div`
  background: linear-gradient(
    135deg,
    var(--color-brand-50) 0%,
    var(--color-grey-0) 100%
  );
  border: 1px solid var(--color-brand-200);
  border-radius: var(--border-radius-lg);
  padding: 2rem 2.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.6rem;
  box-shadow: var(--shadow-sm);
`;

const BannerText = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.4rem;

  & svg {
    width: 2.8rem;
    height: 2.8rem;
    color: var(--color-brand-600);
    flex-shrink: 0;
    margin-top: 0.2rem;
  }

  & h3 {
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-800);
    margin-bottom: 0.4rem;
  }

  & p {
    font-size: 1.3rem;
    color: var(--color-grey-600);
    line-height: 1.5;
  }
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--color-brand-100);
  color: var(--color-brand-700);
  padding: 0.3rem 0.8rem;
  border-radius: 1.2rem;
  font-size: 1.15rem;
  font-weight: 600;
  margin-left: 0.8rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
  gap: 1.6rem;
`;

const StatCard = styled.div`
  background: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 1.6rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  box-shadow: var(--shadow-sm);

  & span:first-child {
    font-size: 1.2rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
    color: var(--color-grey-500);
  }

  & strong {
    font-size: 2.2rem;
    font-weight: 700;
    color: ${(props) => props.$color || "var(--color-grey-800)"};
  }

  & small {
    font-size: 1.15rem;
    color: var(--color-grey-500);
  }
`;

function PricingSummary({ suggestions, analytics, isFetching, onRefresh }) {
  const totalCabins = suggestions.length;

  // Calculate projected revenue delta assuming 60% average 30-day occupancy
  const projectedMonthlyDelta = suggestions.reduce((sum, s) => {
    const diffPerNight = s.suggestedPrice - s.currentPrice;
    return sum + diffPerNight * 18; // ~18 occupied nights/month
  }, 0);

  const avgChange =
    totalCabins > 0
      ? (
          suggestions.reduce((sum, s) => sum + s.changePercent, 0) / totalCabins
        ).toFixed(1)
      : 0;

  const avgOccupancy =
    analytics.length > 0
      ? (
          analytics.reduce((sum, a) => sum + a.occupancyRate, 0) /
          analytics.length
        ).toFixed(1)
      : 0;

  const highConfidenceCount = suggestions.filter(
    (s) => s.confidence === "high"
  ).length;

  return (
    <SummaryContainer>
      <Banner>
        <BannerText>
          <HiOutlineSparkles />
          <div>
            <h3>
              Dynamic Revenue Optimization
            </h3>
            <p>
              AI has analyzed historical occupancy trends, booking velocity, and
              weekend premiums across {totalCabins} cabins to suggest value-maximizing rates.
            </p>
          </div>
        </BannerText>

        <Button
          variation="secondary"
          size="small"
          onClick={onRefresh}
          disabled={isFetching}
          style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem" }}
        >
          {isFetching ? <SpinnerMini /> : <HiOutlineArrowPath />}
          <span>{isFetching ? "Analyzing..." : "Re-run AI Analysis"}</span>
        </Button>
      </Banner>

      <StatsGrid>
        <StatCard $color={projectedMonthlyDelta >= 0 ? "var(--color-brand-600)" : "var(--color-red-700)"}>
          <span>Projected Monthly Delta</span>
          <strong>
            {projectedMonthlyDelta >= 0 ? `+$${projectedMonthlyDelta.toLocaleString()}` : `-$${Math.abs(projectedMonthlyDelta).toLocaleString()}`}
          </strong>
          <small>Estimated monthly revenue impact</small>
        </StatCard>

        <StatCard>
          <span>Average Adjustment</span>
          <strong>{avgChange > 0 ? `+${avgChange}%` : `${avgChange}%`}</strong>
          <small>Across all cabin listings</small>
        </StatCard>

        <StatCard>
          <span>Portfolio Occupancy</span>
          <strong>{avgOccupancy}%</strong>
          <small>90-day historical baseline</small>
        </StatCard>

        <StatCard>
          <span>Confidence Score</span>
          <strong>{highConfidenceCount}/{totalCabins} High</strong>
          <small>Backed by sufficient historical data</small>
        </StatCard>
      </StatsGrid>
    </SummaryContainer>
  );
}

export default PricingSummary;
