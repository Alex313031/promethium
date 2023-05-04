import { lightTheme, darkTheme } from '~/renderer/constants/themes';

export const getTheme = (name: string) => {
  if (name === 'promethium-light') return lightTheme;
  else if (name === 'promethium-dark') return darkTheme;
  return lightTheme;
};
