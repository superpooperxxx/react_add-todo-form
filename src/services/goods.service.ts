import { client } from '../utils/httpClient';
import { Good } from '../types';

// CRUD
export const getGoods = (): Promise<Good[]> => {
  return client.get<Good[]>('/goods');
};

export const deleteGood = (goodId: number): Promise<number> => {
  return client.delete<number>(`/goods/${goodId}`);
};

export const createGood = (good: Omit<Good, 'id'>): Promise<Good> => {
  return client.post<Good>('/goods', good, {});
};

export const updateGood = (good: Good): Promise<Good> => {
  const { id, ...updates } = good;

  return client.patch<Good>(`/goods/${id}`, updates);
};
