import styled from "styled-components";

export const DropdownWrapper = styled.ul`
  background: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  position: absolute;
  top: 3rem;
  right: 0px;
  width: 100px;
`;

export const DropdownItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;

  :hover {
    background: #b4b3b3;
  }

  :first-child {
    border-radius: 0.5rem 0.5rem 0 0;
  }

  :last-child {
    border-radius: 0 0 0.5rem 0.5rem;
  }

  & svg {
    width: 1.1rem;
    margin-right: 0.2rem;
  }
`;
