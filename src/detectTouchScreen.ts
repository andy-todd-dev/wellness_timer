const detectTouchScreen = (): boolean => {
  return navigator.maxTouchPoints > 0;
};

export default detectTouchScreen;
export const isTouchScreen: boolean = detectTouchScreen();
