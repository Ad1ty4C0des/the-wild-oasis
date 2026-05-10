import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import { useDarkMode } from "../../context/DarkModeContext";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-200);
  }
`;

const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TimeBadge = styled.span`
  font-family: "Inter", sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-brand-600);
  background-color: var(--color-brand-50);
  padding: 0.4rem 1.2rem;
  border-radius: 100px;
`;

function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#6fbc94", fill: "#1b4332" },
        extrasSales: { stroke: "#ffb688", fill: "#3d2a14" },
        text: "#c5cdd8",
        background: "#1a1f2e",
      }
    : {
        totalSales: { stroke: "#1b4332", fill: "#c1ecd4" },
        extrasSales: { stroke: "#8d4e21", fill: "#ffdbc7" },
        text: "#4a4843",
        background: "#ffffff",
      };

  return (
    <StyledSalesChart>
      <ChartHeader>
        <Heading as="h2">Sales Representation</Heading>
        <TimeBadge>Last {numDays} days</TimeBadge>
      </ChartHeader>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text, fontSize: 12, fontFamily: "Inter" }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text, fontSize: 12, fontFamily: "Inter" }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.background,
              borderRadius: "12px",
              border: "1px solid var(--color-grey-200)",
              fontFamily: "Inter",
              fontSize: "13px",
            }}
          />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth="2"
            name="Total sales"
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth="2"
            name="Extras sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
