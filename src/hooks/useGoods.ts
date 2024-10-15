import { useCallback, useEffect, useState } from 'react';

import {
  createGood,
  deleteGood,
  getGoods,
  updateGood,
} from '../services/goods.service';

import { Good } from '../types';

export const useGoods = () => {
  const [goods, setGoods] = useState<Good[]>([]);

  // Initial load of the goods
  useEffect(() => {
    getGoods()
      .then(setGoods)
      .catch(() => alert('Ooops, could not fetch goods'));
  }, []);

  // Create Good
  const handleAddGood = (newGood: Omit<Good, 'id'>) => {
    createGood(newGood)
      .then(createdGood => {
        setGoods(currentGoods => [...currentGoods, createdGood]);
      })
      .catch(() => alert('Error'));
  };

  // Delete Good
  const handleDeleteGood = useCallback((goodId: Good['id']) => {
    deleteGood(goodId)
      .then(() => {
        setGoods(currentGoods =>
          currentGoods.filter(good => good.id !== goodId),
        );
      })
      .catch(() => alert('Error'));
  }, []);

  // Update Good
  const handleUpdateGood = useCallback((updatedGood: Good) => {
    updateGood(updatedGood).then(newGood => {
      setGoods(currentGoods =>
        currentGoods.map(good => (newGood.id === good.id ? newGood : good)),
      );
    });
  }, []);

  return { goods, handleAddGood, handleDeleteGood, handleUpdateGood };
};
