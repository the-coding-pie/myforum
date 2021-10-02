import styled from "styled-components";

export const CommunityCardWrapper = styled.div`
  & .top {
    background: ${({ theme }) => theme.colors.primary};
    padding: 1rem;
    border-radius: 5px 5px 0 0;

    h3 {
      font-size: ${({ theme }) => theme.fontSize.sm};
      font-weight: 600;
      text-align: center;
      color: #ffffff;
      text-transform: uppercase;
    }
  }
`;

export const CommunityCardBody = styled.div`
  background: #ffffff;
  padding: 0.5rem 0.5rem 1rem 0.5rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

export const CommunityList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const CommunityItem = styled.li`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #cccccc;
  background: #ffffff;
  width: 100%;

  :last-child {
    border-radius: 0 0 5px 5px;
  }

  & :hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  & a {
    text-decoration: none;
    font-weight: 600;
    width: 100%;
    color: #3b3b3b;
    padding: 0.9rem 1rem;
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  & .ranking {
    margin-right: 1rem;
  }
`;
