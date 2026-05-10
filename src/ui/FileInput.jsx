import styled from "styled-components";

const FileInput = styled.input.attrs({ type: "file" })`
  font-family: "Inter", sans-serif;
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.8rem 1.2rem;
    margin-right: 1.2rem;
    border-radius: var(--border-radius-sm);
    border: none;
    color: #ffffff;
    background-color: var(--color-brand-600);
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--color-brand-700);
    }
  }
`;

export default FileInput;
