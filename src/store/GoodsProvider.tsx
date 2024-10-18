import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  createGood,
  deleteGood,
  getGoods,
  updateGood,
} from '../services/goods.service';

import { Good } from '../types';

const GoodsContext = createContext<Good[]>([]);

interface GoodsMethods {
  handleAddGood: (good: Omit<Good, 'id'>) => void;
  handleDeleteGood: (goodId: Good['id']) => void;
  handleUpdateGood: (good: Good) => void;
}

const GoodsMethodsContext = createContext<GoodsMethods>({
  handleAddGood: () => {},
  handleDeleteGood: () => {},
  handleUpdateGood: () => {},
});

export const useGoods = () => useContext(GoodsContext);
export const useGoodsMethods = () => useContext(GoodsMethodsContext);

interface Props {
  children: ReactNode;
}

export const GoodsProvider: FC<Props> = ({ children }) => {
  const [goods, setGoods] = useState<Good[]>([]);

  // Initial load of the goods
  useEffect(() => {
    getGoods()
      .then(setGoods)
      .catch(() => alert('Ooops, could not fetch goods'));
  }, []);

  // Create Good
  const handleAddGood = useCallback((newGood: Omit<Good, 'id'>) => {
    createGood(newGood)
      .then(createdGood => {
        setGoods(currentGoods => [...currentGoods, createdGood]);
      })
      .catch(() => alert('Error'));
  }, []);

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

  return (
    <GoodsContext.Provider value={goods}>
      <GoodsMethodsContext.Provider
        value={{
          handleAddGood,
          handleDeleteGood,
          handleUpdateGood,
        }}
      >
        {children}
      </GoodsMethodsContext.Provider>
    </GoodsContext.Provider>
  );
};
