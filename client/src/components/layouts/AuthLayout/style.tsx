import styled from "styled-components";

export const AuthContainer = styled.div`
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

  & > .content {
    margin-left: 2rem;
  }
`;
