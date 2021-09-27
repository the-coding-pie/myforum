import styled from "styled-components";

export const BottomText = styled.p`
  margin-top: 1.5rem;
  font-size: ${({ theme }) => theme.fontSize.sm};

  & a {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
