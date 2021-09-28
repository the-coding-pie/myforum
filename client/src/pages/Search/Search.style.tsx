import styled from "styled-components";

export const SearchBanner = styled.div`
background: #ffffff;
border-top: 1px solid #cccccc;
height: 5rem;
display: flex;
justify-content: center;
align-items: center;
font-weight: 600;
font-size: ${({ theme }) => theme.fontSize.xl}
`;
