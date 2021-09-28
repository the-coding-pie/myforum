import styled from "styled-components";

export const SearchBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 5px;
  background: #ebebeb;
  color: #707070;
  width: 350px;

  form {
    width: 100%;
  }

  & svg {
    width: 1rem;
    margin-right: 0.3rem;
  }

  & input {
    background: none;
    outline: none;
    border: none;
    width: 100%;
    height: 100%;
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: #707070;
  }
`;
