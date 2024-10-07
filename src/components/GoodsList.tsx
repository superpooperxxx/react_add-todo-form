import { FC } from 'react';

import { GoodCard } from './GoodCard';

import { Good } from '../types';

interface Props {
  goods: Good[];
  onDelete: (goodId: Good['id']) => void;
  onUpdate: (updatedGood: Good) => void;
}

export const GoodsList: FC<Props> = ({ goods, onDelete, onUpdate }) => (
  <div className="GoodList">
    {goods.map(good => (
      <GoodCard
        key={good.id}
        good={good}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    ))}
  </div>
);
