interface MeditationTimerConfig {
  editTimerButtonsEnabled: boolean;
}

interface AppConfig {
  buildName: string;
  meditationTimer: MeditationTimerConfig;
}

const buildEnv = import.meta.env.VITE_BUILD;
const Config: AppConfig = {
  buildName: buildEnv ? buildEnv.substring(0, 7) : "dev",
  meditationTimer: {
    editTimerButtonsEnabled: JSON.parse(
      import.meta.env.VITE_MT_EDIT_BUTTONS_ENABLED.toLowerCase()
    ),
  },
};

export default Config;
