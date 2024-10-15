import { FC, FormEvent, useState } from 'react';
import cn from 'classnames';

import { Good } from '../types';

interface Props {
  onSubmit: (newGood: Omit<Good, 'id'>) => void;
  good?: Good;
  onCancel?: () => void;
}

export const GoodForm: FC<Props> = ({
  onSubmit,
  good,
  onCancel = () => {},
}) => {
  const DEFAULT_GOOD_NAME = good?.name || '';
  const DEFAULT_COLOR = good?.color || 'black';

  const [newGoodName, setNewGoodName] =
    useState<Good['name']>(DEFAULT_GOOD_NAME);
  const [nameError, setNameError] = useState('');

  const [selectedColor, setSelectedColor] =
    useState<Good['color']>(DEFAULT_COLOR);
  const [colorIdError, setColorIdError] = useState('');

  const handleReset = () => {
    setNewGoodName('');
    setNameError('');

    setSelectedColor('black');
    setColorIdError('');
  };

  const handleCancel = () => {
    setNewGoodName(DEFAULT_GOOD_NAME);
    setNameError('');

    setSelectedColor(DEFAULT_COLOR);
    setColorIdError('');

    onCancel();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newGoodName) {
      setNameError('Please enter a name!');

      return;
    }

    const newGood: Omit<Good, 'id'> = {
      name: newGoodName,
      color: selectedColor,
    };

    onSubmit(newGood);

    handleReset();
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <div className="field">
        <input
          type="text"
          value={newGoodName}
          onChange={event => {
            setNewGoodName(event.target.value.trimStart());
            setNameError('');
          }}
          className={cn({ 'with-error': nameError })}
          placeholder="e.g. Horilka"
        />

        {nameError && <span className="error">{nameError}</span>}
      </div>

      <div className="field">
        <select
          value={selectedColor}
          onChange={event => {
            setSelectedColor(event.target.value);
            setColorIdError('');
          }}
          className={cn({ 'with-error': colorIdError })}
        >
          <option value="black">black</option>

          {['red', 'blue', 'green'].map(color => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>

        {colorIdError && <span className="error">{colorIdError}</span>}
      </div>

      <button type="submit">{good ? 'Save' : 'Add'}</button>
      <button type="reset">Reset</button>

      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
};
