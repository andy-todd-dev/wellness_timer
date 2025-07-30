import React, { ReactNode } from "react";
import { allThemes, DEFAULT_THEME } from "./themes";
import useLocalStorage from "use-local-storage";
import { ThemeProvider } from "@mui/system";

type ThemeConfigurerProps = {
  children: ReactNode;
};

export const ThemeConfigurer = ({ children }: ThemeConfigurerProps) => {
  const [currentThemeName] = useLocalStorage("theme", DEFAULT_THEME);
  const theme = allThemes[currentThemeName] || allThemes[DEFAULT_THEME];

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
