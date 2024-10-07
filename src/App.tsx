/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
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

export const App = () => {
  const [goods, setGoods] = useState<Good[]>(goodsWithColor);

  const handleAddGood = (newGood: Good) => {
    setGoods(currentGoods => [...currentGoods, newGood]);
  };

  const handleDeleteGood = (goodId: Good['id']) => {
    setGoods(currentGoods => currentGoods.filter(good => good.id !== goodId));
  };

  const handleUpdateGood = (updatedGood: Good) => {
    setGoods(currentGoods =>
      currentGoods.map(good =>
        updatedGood.id === good.id ? updatedGood : good,
      ),
    );
  };

  return (
    <div className="App">
      <h1>Goods</h1>
      <GoodForm onSubmit={handleAddGood} />
      <GoodsList
        goods={goods}
        onDelete={handleDeleteGood}
        onUpdate={handleUpdateGood}
      />
    </div>
  );
};
