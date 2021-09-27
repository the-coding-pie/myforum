import styled from "styled-components";

export const ProfileCardWrapper = styled.button`
  display: flex;
  align-items: center;
  background: none;
  outline: none;
  border: none;
  position: relative;

  & span {
    font-size: ${({ theme }) => theme.fontSize.sm};
    margin-right: 0.3rem;
  }
`;

export const DownButtonWrapper = styled.div`
  width: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
