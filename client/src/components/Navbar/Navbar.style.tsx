import styled from "styled-components";

export const NavbarWrapper = styled.div`
  width: 100vw;
  height: 3.5rem;
  background: #ffffff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

export const NavContainer = styled.div`
  width: 94%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

export const NavLeft = styled.div`
  flex: 1 1;
  display: flex;
  align-items: center;
`;

export const NavRight = styled.div`
  flex: 1 1;
  display: flex;
  justify-content: flex-end;
`;
