import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background-color: transparent;
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: #ffffff;
    `}

  border-radius: var(--border-radius-sm);
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 1.3rem;
  /* To give the same height as select */
  padding: 0.5rem 1rem;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: #ffffff;
  }
`;

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", 1); //Gemini update
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          active={option.value === currentFilter}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
