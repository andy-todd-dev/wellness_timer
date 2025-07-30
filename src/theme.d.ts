
import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    backgroundImage?: string;
  }
  interface ThemeOptions {
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
