import styled from "styled-components";

export const PostCardWrapper = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #ccc;
  border-bottom: 0px;

  a {
    text-decoration: none;
  }

  :last-child {
    border-bottom: 1px solid #ccc;
  }
`;

export const PostCardLeft = styled.div`
  flex: 1 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.sm};

  & button {
    background: none;
    border: none;
    outline: none;
  }

  & button svg {
    width: 1rem;
  }
`;

export const PostCardRight = styled.div`
  flex: 7 7;
  display: flex;
  flex-direction: column;

  & h3 {
    margin-bottom: 0.2rem;
    font-weight: 500;
  }

  & h3 a {
    color: #222222;

    :hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  & p {
    margin-bottom: 0.8rem;
    color: #707070;
    font-weight: 300;
    font-size: 0.93rem;
  }
`;

export const PostCardBottom = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.fontSize.sm};

  & span {
    margin-right: 0.4rem;
    color: #525151;
  }

  & .community,
  & .comments,
  & .user {
    font-weight: 600;
    color: #525151;
  }

  & .community a,
  & .comments a,
  & .user a {
    font-weight: 600;
    color: #525151;

    :hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
