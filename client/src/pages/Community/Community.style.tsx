import styled from "styled-components";

export const CommunityBanner = styled.div`
  background: #ffffff;
  border-top: 1px solid #cccccc;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CommunityLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 1rem;

  & h3 {
    font-size: ${({ theme }) => theme.fontSize.dxl};
    font-weight: bold;
  }

  & span {
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`;

export const CommunityRight = styled.div`
    max-width: 9rem;

    & button {
        padding: 0.6rem 2rem;
    }
`