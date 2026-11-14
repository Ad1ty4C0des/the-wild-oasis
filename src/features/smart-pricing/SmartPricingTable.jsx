import { useState } from "react";
import styled from "styled-components";
import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import PricingSummary from "./PricingSummary";
import SmartPricingRow from "./SmartPricingRow";
import { usePricingSuggestions } from "./usePricingSuggestions";

const ErrorBox = styled.div`
  background: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 3.2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;

  & p {
    font-size: 1.5rem;
    color: var(--color-grey-600);
  }
`;

const EmptyBox = styled.div`
  background: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 4rem 2rem;
  text-align: center;
  color: var(--color-grey-500);

  & h4 {
    font-size: 1.6rem;
    color: var(--color-grey-700);
    margin-bottom: 0.8rem;
  }
`;

function SmartPricingTable() {
  const {
    suggestions,
    analytics,
    isLoading,
    isFetching,
    error,
    refetch,
  } = usePricingSuggestions();

  const [dismissedIds, setDismissedIds] = useState([]);

  function handleDismiss(cabinId) {
    setDismissedIds((prev) => [...prev, cabinId]);
  }

  function handleResetDismissed() {
    setDismissedIds([]);
  }

  if (isLoading) return <Spinner />;

  if (error) {
    return (
      <ErrorBox>
        <p>Could not generate AI pricing recommendations right now.</p>
        <Button onClick={() => refetch()}>Try Again</Button>
      </ErrorBox>
    );
  }

  const activeSuggestions = suggestions.filter(
    (s) => !dismissedIds.includes(s.cabinId)
  );

  const analyticsMap = new Map((analytics || []).map((a) => [a.cabinId, a]));

  return (
    <div>
      <PricingSummary
        suggestions={suggestions}
        analytics={analytics}
        isFetching={isFetching}
        onRefresh={() => {
          handleResetDismissed();
          refetch();
        }}
      />

      {activeSuggestions.length === 0 ? (
        <EmptyBox>
          <h4>All recommendations reviewed</h4>
          <p>You have reviewed or dismissed all current pricing suggestions.</p>
          <div style={{ marginTop: "1.6rem" }}>
            <Button variation="secondary" size="small" onClick={handleResetDismissed}>
              Reset Dismissed Items
            </Button>
          </div>
        </EmptyBox>
      ) : (
        <Table columns="1.4fr 0.9fr 1.3fr 1.1fr 0.9fr 2.2fr 1.1fr">
          <Table.Header>
            <div>Cabin</div>
            <div>Current</div>
            <div>Occupancy</div>
            <div>AI Suggested</div>
            <div>Change</div>
            <div>AI Signals & Reasoning</div>
            <div>Actions</div>
          </Table.Header>

          <Table.Body
            data={activeSuggestions}
            render={(suggestion) => (
              <SmartPricingRow
                key={suggestion.cabinId}
                suggestion={suggestion}
                analytics={analyticsMap.get(suggestion.cabinId)}
                onDismiss={handleDismiss}
              />
            )}
          />
        </Table>
      )}
    </div>
  );
}

export default SmartPricingTable;
