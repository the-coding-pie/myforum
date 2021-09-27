import styled from "styled-components";

export const CreateButtonWrapper = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  border-radius: 50%;
  border: none;
  outline: none;
  width: 1.8rem;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    margin: 0.4rem;
  }
`;
