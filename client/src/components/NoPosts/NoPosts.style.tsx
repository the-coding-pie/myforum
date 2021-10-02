import styled from "styled-components";

export const NoPostsWrapper = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border: 1px solid #ccc;
  border-bottom: 0px;

  font-weight: 600;
  color: #8f8f8f;
  text-transform: uppercase;

  font-size: ${({ theme }) => theme.fontSize.sm};
`;
