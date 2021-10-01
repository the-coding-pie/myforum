import styled from "styled-components";

export const CommentCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 3px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: #333232;
  padding: 0.8rem;
  margin-top: 1rem;
  border: 1px solid #ccc;

  p {
    font-size: 0.95rem;
  }

`;

export const CommentCardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;

  a {
    text-decoration: none;
    color: #222222;
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontSize.sm};
    margin-right: 0.5rem;

    :hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  time {
    color: #5a5a5a;
  }
`;
