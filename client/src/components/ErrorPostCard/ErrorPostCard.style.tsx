
import styled from "styled-components";

export const ErrorPostCardWrapper = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border: 1px solid #ccc;
  border-bottom: 0px;
  margin-bottom: 1rem;

  font-weight: 600;
  color: #be2a2a;
  text-transform: uppercase;

  font-size: ${({ theme }) => theme.fontSize.sm};
`;