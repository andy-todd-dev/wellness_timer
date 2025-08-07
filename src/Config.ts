interface MeditationTimerConfig {
  editTimerButtonsEnabled: boolean;
  minimumTimerSeconds: number; // Minimum time in seconds
  maximumTimerSeconds: number; // Maximum time in seconds
  defaultTimerSeconds: number; // Default time in seconds
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
    minimumTimerSeconds: 60, // 1 minute
    maximumTimerSeconds: 99 * 60, // 99 minutes
    defaultTimerSeconds: 20 * 60, // 20 minutes
  },
};
export default Config;
