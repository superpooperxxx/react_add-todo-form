import { Color } from '../types';

const colors: Color[] = [
  { id: 1, name: 'red' },
  { id: 2, name: 'green' },
  { id: 3, name: 'blue' },
];

export const getColors = () => {
  return colors;
};

export const getColorById = (colorId: number) => {
  return getColors().find(color => color.id === colorId);
};
