/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useMemo, useState } from 'react';
import './App.scss';

import { GoodForm } from './components/GoodForm';
import { GoodsList } from './components/GoodsList';

import { Good } from './types';

import { goodsFromServer } from './api/goods';

import { getColorById } from './api/colors.service';

const goodsWithColor: Good[] = goodsFromServer.map(good => {
  return {
    ...good,
    color: getColorById(good.colorId),
  };
});

const getFilteredGoods = (goods: Good[], query: string) => {
  let filteredGoods = [...goods];

  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery) {
    filteredGoods = filteredGoods.filter(good => {
      const normalizedGoodName = good.name.trim().toLowerCase();

      return normalizedGoodName.includes(normalizedQuery);
    });
  }

  return filteredGoods;
};

export const App = () => {
  const [goods, setGoods] = useState<Good[]>(goodsWithColor);
  const [query, setQuery] = useState('');
  const [count, setCount] = useState(0);

  const handleAddGood = (newGood: Good) => {
    setGoods(currentGoods => [...currentGoods, newGood]);
  };

  const handleDeleteGood = useCallback((goodId: Good['id']) => {
    setGoods(currentGoods => currentGoods.filter(good => good.id !== goodId));
  }, []);

  const handleUpdateGood = useCallback((updatedGood: Good) => {
    setGoods(currentGoods =>
      currentGoods.map(good =>
        updatedGood.id === good.id ? updatedGood : good,
      ),
    );
  }, []);

  const filteredGoods = useMemo(
    () => getFilteredGoods(goods, query),
    [goods, query],
  );

  return (
    <div className="App">
      <h1>Goods</h1>

      <span>{count}</span>
      <button type="button" onClick={() => setCount(current => current + 1)}>
        increment
      </button>

      <label style={{ display: 'block', marginBottom: '15px' }}>
        Search by name
        <input value={query} onChange={event => setQuery(event.target.value)} />
      </label>

      <GoodForm onSubmit={handleAddGood} />

      <GoodsList
        goods={filteredGoods}
        onDelete={handleDeleteGood}
        onUpdate={handleUpdateGood}
      />
    </div>
  );
};
