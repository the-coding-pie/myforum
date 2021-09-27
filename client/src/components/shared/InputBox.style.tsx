import styled from "styled-components";


export const InputBox = styled.input`
    background: #EBEBEB;
    border-radius: 5px;
    border: 0.5px solid #BBB7B7;
    outline: none;
    padding: 0.7rem 1rem;
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: #707070;
    margin-bottom: 1rem;
`