import styled from "styled-components";

export const AuthWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #ffffff;
  display: grid;
  grid-template-columns: 1fr 4fr;
  & > .banner {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  button {
    margin-bottom: 1rem;
  }
`;

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