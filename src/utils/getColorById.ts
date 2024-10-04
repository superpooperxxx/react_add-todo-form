import { colors } from '../api/colors';

export const getColorById = (colorId: number) => {
  return colors.find(color => color.id === colorId);
};
