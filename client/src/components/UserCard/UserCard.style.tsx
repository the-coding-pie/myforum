import styled from "styled-components";

export const UserCardWrapper = styled.div`
  & .top {
    background: ${({ theme }) => theme.colors.primary};
    padding: 1rem;
    border-radius: 5px 5px 0 0;
    text-align: center;

    h3 {
      font-size: ${({ theme }) => theme.fontSize.lg};
      font-weight: 600;
      text-align: center;
      color: #ffffff;
      margin-bottom: 0.1rem;
    }

    span {
      font-size: ${({ theme }) => theme.fontSize.sm};
      color: #f5f5f5;
    }
  }
`;

export const UserBody = styled.div`
  background: #fff;
  border-radius: 0 0 5px 5px;
  text-align: center;
  padding: 1rem;

  p {
    font-weight: 600;
    margin-bottom: 0.2rem;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${({ theme }) => theme.fontSize.sm};

    svg {
      width: 1.1rem;
      margin-right: 0.2rem;
    }
  }
`;
