import styled from "styled-components";

export const CreateButtonWrapper = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  border: none;
  outline: none;

  margin-right: 1rem;

  & a {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & svg {
    width: 1.1rem;
    height: 1.1rem;
    color: #ffffff;
    margin: 0.4rem;
  }
`;
