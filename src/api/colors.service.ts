import { Color } from '../types';

export const getColors = (): Promise<Color[]> => {
  return fetch('http://localhost:3000/api/colors.json').then(res => res.json());
};

export const getColorById = async (colorId: Color['id']) => {
  const colors = await getColors();

  return colors.find(color => color.id === colorId);
};
