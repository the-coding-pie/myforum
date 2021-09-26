import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500&display=swap");

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    font-size: 16px;
  }
  
  body {
    width: 100vw;
    height: 100vh;
    max-width: 100vw !important;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  
    background: ${({ theme }) => theme.colors.bg};
    font-family: ${({ theme }) => theme.fonts.ibm};
    font-weight: 400;
  }
`;

export default GlobalStyle;
