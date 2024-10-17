/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useState } from 'react';
import './App.scss';

import { GoodForm } from './components/GoodForm';
import { GoodsList } from './components/GoodsList';

import { useGoods } from './hooks/useGoods';
import { Good } from './types';

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
  const { goods, handleAddGood, handleDeleteGood, handleUpdateGood } =
    useGoods();
  const [query, setQuery] = useState('');

  const filteredGoods = useMemo(
    () => getFilteredGoods(goods, query),
    [goods, query],
  );

  return (
    <div className="App">
      <h1>Goods</h1>

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
