import { FC, useState } from 'react';
import { Good } from '../types';
import { GoodForm } from './GoodForm';
import { useGoodsMethods } from '../store/GoodsProvider';

interface Props {
  good: Good;
}

export const GoodCard: FC<Props> = ({ good }) => {
  const [isEditing, setIsEditing] = useState(false);

  const { handleUpdateGood: onUpdate, handleDeleteGood: onDelete } =
    useGoodsMethods();

  const handleUpdate = (updatedGood: Omit<Good, 'id'>) => {
    onUpdate({
      id: good.id,
      ...updatedGood,
    });
    setIsEditing(false);
  };

  return (
    <article className="GoodCard">
      {isEditing ? (
        <GoodForm
          onSubmit={handleUpdate}
          good={good}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <p
            className="GoodCard__title"
            style={{ color: good.color || 'black' }}
          >
            {good.name}
          </p>

          <button type="button" onClick={() => setIsEditing(true)}>
            edit
          </button>

          <button type="button" onClick={() => onDelete(good.id)}>
            x
          </button>
        </>
      )}
    </article>
  );
};
