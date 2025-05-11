import styled from "styled-components";

export const Button = styled.button`
  padding: 0.5rem 1.5rem;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #34495e;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
