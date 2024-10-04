import { FC } from 'react';

import { Good } from '../types';

interface Props {
  goods: Good[];
}

export const GoodsList: FC<Props> = ({ goods }) => (
  <div className="GoodList">
    {goods.map(good => (
      <article key={good.id} className="GoodCard">
        <p
          className="GoodCard__title"
          style={{ color: good.color?.name || 'black' }}
        >
          {good.name}
        </p>
      </article>
    ))}
  </div>
);
