import styled from "styled-components";

export const AuthContent = styled.div`
  padding: 3rem 2rem;
  max-width: 30%;
  display: flex;
  align-items: center;

  & > div {
    width: 100%;
  }

  & h1 {
    font-size: ${({ theme }) => theme.fontSize.dxl};
    font-weight: 600;
    margin-bottom: 1.5rem;
  }

  & form {
    display: flex;
    flex-direction: column;
  }
`;
