const Config = {
  buildName:
    (process.env.REACT_APP_BUILD &&
      process.env.REACT_APP_BUILD.substring(0, 7)) ||
    "dev",
  meditationTimer: {
    editTimerButtonsEnabled: JSON.parse(
      process.env.REACT_APP_MT_EDIT_BUTTONS_ENABLED.toLowerCase()
    ),
  },
};

export default Config;
