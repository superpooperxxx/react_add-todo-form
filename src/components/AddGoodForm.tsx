import { Dispatch, FC, FormEvent, SetStateAction, useState } from 'react';

import { colors } from '../api/colors';

import { Good } from '../types';

import { getColorById } from '../utils';
import cn from 'classnames';

interface Props {
  setGoods: Dispatch<SetStateAction<Good[]>>;
}

export const AddGoodForm: FC<Props> = ({ setGoods }) => {
  const [newGoodName, setNewGoodName] = useState('');
  const [nameError, setNameError] = useState('');

  const [selectedColorId, setSelectedColorId] = useState(0);
  const [colorIdError, setColorIdError] = useState('');

  const handleReset = () => {
    setNewGoodName('');
    setNameError('');

    setSelectedColorId(0);
    setColorIdError('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newGoodName) {
      setNameError('Please enter a name!');

      return;
    }

    if (selectedColorId === 0) {
      setColorIdError('Please choose a color!');

      return;
    }

    const newGood: Good = {
      id: Date.now(),
      name: newGoodName,
      colorId: selectedColorId,
      color: getColorById(selectedColorId),
    };

    setGoods(currentGoods => [...currentGoods, newGood]);

    handleReset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          value={newGoodName}
          onChange={event => {
            setNewGoodName(event.target.value.trimStart());
            setNameError('');
          }}
          className={cn({ 'with-error': nameError })}
        />

        {nameError && <span className="error">{nameError}</span>}
      </div>

      <div className="field">
        <select
          value={selectedColorId}
          onChange={event => {
            setSelectedColorId(+event.target.value);
            setColorIdError('');
          }}
          className={cn({ 'with-error': colorIdError })}
        >
          <option value="0" disabled>
            Choose a color
          </option>

          {colors.map(color => (
            <option key={color.id} value={color.id}>
              {color.name}
            </option>
          ))}
        </select>

        {colorIdError && <span className="error">{colorIdError}</span>}
      </div>

      <button type="submit">Add</button>
    </form>
  );
};
