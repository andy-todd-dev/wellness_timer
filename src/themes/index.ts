import { createTheme } from "@mui/material";
import { deepmerge } from "@mui/utils";
import auroraBackground from "../images/aurora_bg.webp";
import waterBackground from "../images/water_bg.webp";

import type { ThemeOptions, Theme } from "@mui/material";

const baseTheme: ThemeOptions = {
  typography: {
    timer: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "6rem",
      fontWeight: 500,
      lineHeight: 1,
      letterSpacing: "-0.01562em",
    },
  },
};

const buildTheme = (theme: ThemeOptions): Theme =>
  createTheme(deepmerge(baseTheme, theme));

const auroraTheme = buildTheme({
  name: "Aurora",
  backgroundImage: auroraBackground,
  palette: {
    primary: {
      main: "rgb(0, 0, 0, 0.87)",
    },
    secondary: {
      main: "rgb(255, 255, 255, 0.87)",
    },
  },
});

const waterTheme = buildTheme({
  name: "Water",
  backgroundImage: waterBackground,
  palette: {
    primary: {
      main: "rgb(0, 0, 0, 0.87)",
    },
    secondary: {
      main: "rgb(255, 255, 255, 0.87)",
    },
  },
});

export const DEFAULT_THEME = auroraTheme;

export const allThemes: Record<string, typeof auroraTheme> = {
  [auroraTheme.name]: auroraTheme,
  [waterTheme.name]: waterTheme,
};
