import styled from "styled-components";

export const CommentBoxWrapper = styled.div`
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin: 1rem 0rem;
  padding: 1rem;

  textarea {
    width: 100%;
    resize: none;
    max-width: 100%;
    max-height: 10rem;
    border: 1px solid #ccc;
    outline: none;
    padding: 1rem;
    font-size: ${({ theme }) => theme.fontSize.sm};
    border-radius: 3px;
    color: #5a5a5a;
    margin-bottom: 0.5rem;
    font-family: ${({ theme }) => theme.fonts.ibm};
  }

  .button-wrapper {
    display: flex;
    justify-content: flex-end;

    button {
        width: 200px;
    }
  }
`;
