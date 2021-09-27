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
  align-items: center;
  height: 100%;
`;

export const Buttons = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  & a {
    color: inherit;
    text-decoration: none;
    width: 100%;

    :first-child {
      margin-right: 0.5rem;
    }
  }
`;

export const NavLinks = styled.ul`
  display: flex;
  align-items: center;

  li {
    height: 100%;

    a {
      padding-bottom: 1rem;
      text-decoration: none;
      color: #818181;
      margin-right: 0.8rem;
      text-transform: uppercase;
      font-size: ${({ theme }) => theme.fontSize.xs};
      font-weight: 600;

      :hover {
        border-bottom: 4px solid ${({ theme }) => theme.colors.primary};
      }
    }

    a.active {
      border-bottom: 4px solid ${({ theme }) => theme.colors.primary};
    }
  }
`;
