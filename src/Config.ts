interface MeditationTimerConfig {
  editTimerButtonsEnabled: boolean;
}

interface AppConfig {
  buildName: string;
  meditationTimer: MeditationTimerConfig;
}

const Config: AppConfig = {
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
