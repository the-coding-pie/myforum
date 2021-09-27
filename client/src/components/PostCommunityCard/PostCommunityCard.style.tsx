import styled from "styled-components";

export const AboutCardWrapper = styled.div`

  & .top {
    background: ${({ theme }) => theme.colors.primary};
    padding: 1rem;
    border-radius: 5px 5px 0 0;

    h3 {
      font-size: ${({ theme }) => theme.fontSize.sm};
      font-weight: 600;
      text-align: center;
      color: #ffffff;
    }
  }
`;

export const AboutBody = styled.div`
  background: #ffffff;
  padding: 0.5rem 0.5rem 1rem 0.5rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: #333333;
  border-radius: 0 0 5px 5px;

  & .subscribers {
    font-size: ${({ theme }) => theme.fontSize.base};
    font-weight: 600;
    text-align: center;
    margin: 1rem 0 0.5rem;
    padding-bottom: 1rem;

    border-bottom: 1px solid #ccc;
  }

  & .created {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 1.1rem;
      margin-right: 0.5rem;
    }
  }

  & button {
      margin-top: 1rem;
  }
`;
