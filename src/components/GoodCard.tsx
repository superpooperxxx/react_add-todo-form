import { FC, useState } from 'react';
import { Good } from '../types';
import { GoodForm } from './GoodForm';

interface Props {
  good: Good;
  onDelete: (goodId: Good['id']) => void;
  onUpdate: (updatedGood: Good) => void;
}

export const GoodCard: FC<Props> = ({ good, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (updatedGood: Good) => {
    onUpdate(updatedGood);
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
            style={{ color: good.color?.name || 'black' }}
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
