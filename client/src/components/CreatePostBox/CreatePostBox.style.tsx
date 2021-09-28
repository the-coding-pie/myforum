import styled from "styled-components";

export const RootWrapper = styled.div`
  h3 {
    margin-bottom: 0.8rem;
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`;

export const CreatePostBoxWrapper = styled.div`
  background: #ffffff;
  padding: 1rem 2rem;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
`;

export const ChooseButtons = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
`;

export const ChooseButton = styled.button<{ active?: boolean }>`
  background: ${({ theme, active }) =>
    active ? theme.colors.primary : "#ffffff"};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  color: ${({ theme, active }) => (active ? "#ffffff" : theme.colors.primary)};
  flex: 1 1;
  padding: 0.5rem;
  text-transform: uppercase;

  :first-child {
    border-right: 0;
    border-radius: 3px 0px 0px 3px;
  }

  :last-child {
    border-radius: 0px 3px 3px 0px;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;

  label {
    text-transform: uppercase;
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: 600;
    color: #5f5f5f;
    margin-bottom: 0.5rem;
  }

  select,
  input,
  textarea {
    padding: 0.5rem;
    border-radius: 3px;
    background: #ffffff;
    border: 1px solid #ccc;
    outline: none;
    color: #2c2c2c;
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  textarea {
    height: 5rem;
    resize: none;
    font-family: ${({ theme }) => theme.fonts.ibm};
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  button {
    margin-top: 0.5rem;
    width: 200px;
  }
`;
