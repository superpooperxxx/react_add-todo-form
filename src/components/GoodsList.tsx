import React, { FC } from 'react';

import { GoodCard } from './GoodCard';

import { Good } from '../types';

interface Props {
  goods: Good[];
}

export const GoodsList: FC<Props> = React.memo(({ goods }) => (
  <div className="GoodList">
    {goods.map(good => (
      <GoodCard key={good.id} good={good} />
    ))}
  </div>
));

GoodsList.displayName = 'GoodsList';
