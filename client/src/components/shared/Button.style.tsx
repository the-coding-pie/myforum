import styled, { DefaultTheme, StyledComponent } from "styled-components";

interface Props {
  light?: boolean;
  sm?: boolean;
}

export const Button = styled.button<Props>`
  background: ${({ theme, light }) =>
    light ? "#ffffff" : theme.colors.primary};
  color: ${({ theme, light }) => (light ? theme.colors.primary : "#ffffff")};

  border: ${({ theme, light }) =>
    light ? `1px solid ${theme.colors.primary}` : "none"};
  border-radius: 5rem;
  padding: ${({ sm }) => sm ? ".5rem 0.8rem" : "0.8rem 1rem"};
  font-weight: bold;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.sm};
  outline: none;
  width: 100%;
`;
