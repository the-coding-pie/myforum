import styled from "styled-components";

export const InputBoxWrapper = styled.div`
  margin-bottom: 1rem;
`;

export const InputBox = styled.input`
  width: 100%;
  background: #ebebeb;
  border-radius: 5px;
  border: 0.5px solid #bbb7b7;
  outline: none;
  padding: 0.7rem 1rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: #707070;
  margin-bottom: 0.3rem;
`;

export const ErrorText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: #ed4e5a;
`;
