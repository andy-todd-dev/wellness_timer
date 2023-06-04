const Config = {
  buildName:
    (import.meta.env.VITE_BUILD &&
      import.meta.env.VITE_BUILD.substring(0, 9)) ||
    "dev",
  meditationTimer: {
    editTimerButtonsEnabled: JSON.parse(
      import.meta.env.VITE_MT_EDIT_BUTTONS_ENABLED.toLowerCase()
    ),
  },
};

export default Config;
