import styled from "styled-components";

export const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  border: none;
  border-radius: 5rem;
  padding: 0.8rem 1rem;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  margin-bottom: 1rem;
  width: 100%;
`;
