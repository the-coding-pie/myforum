import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    fonts: {
      ibm: string;
    };
    colors: {
      bg: string;
      primary: string;
    };
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      dxl: string;
    };
  }
}
