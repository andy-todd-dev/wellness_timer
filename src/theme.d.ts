import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    name: string;
    backgroundImage?: string;
  }
  interface ThemeOptions {
    name?: string;
    backgroundImage?: string;
  }

  interface TypographyVariants {
    timer: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    timer?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    timer: true;
  }
}
