/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import './App.scss';

import { AddGoodForm } from './components/AddGoodForm';
import { GoodsList } from './components/GoodsList';

import { Good } from './types';

import { goodsFromServer } from './api/goods';

import { getColorById } from './utils';

const goodsWithColor: Good[] = goodsFromServer.map(good => {
  return {
    ...good,
    color: getColorById(good.colorId),
  };
});

export const App = () => {
  const [goods, setGoods] = useState<Good[]>(goodsWithColor);

  return (
    <div className="App">
      <h1>Goods</h1>
      <AddGoodForm setGoods={setGoods} />
      <GoodsList goods={goods} />
    </div>
  );
};
