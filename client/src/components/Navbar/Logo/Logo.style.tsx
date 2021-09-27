import styled from "styled-components";

export const LogoWrapper = styled.div`
  margin-right: 1.5rem;

  & a {
    text-decoration: none;
    color: #222222;
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-family: ${({ theme }) => theme.fonts.robotoMono};
    font-weight: 500;
    cursor: pointer;
  }

  & .special-text {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
