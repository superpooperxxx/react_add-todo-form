import { FC, FormEvent, useEffect, useState } from 'react';
import cn from 'classnames';

import { getColorById, getColors } from '../api/colors.service';

import { Color, Good } from '../types';

interface Props {
  onSubmit: (newGood: Good) => void;
  good?: Good;
  onCancel?: () => void;
}

export const GoodForm: FC<Props> = ({
  onSubmit,
  good,
  onCancel = () => {},
}) => {
  const DEFAULT_GOOD_NAME = good?.name || '';
  const DEFAULT_COLOR_ID = good?.colorId || 0;

  const [newGoodName, setNewGoodName] =
    useState<Good['name']>(DEFAULT_GOOD_NAME);
  const [nameError, setNameError] = useState('');

  const [selectedColorId, setSelectedColorId] =
    useState<Good['colorId']>(DEFAULT_COLOR_ID);
  const [colorIdError, setColorIdError] = useState('');

  const [colors, setColors] = useState<Color[]>([]);

  useEffect(() => {
    getColors().then(setColors);

    const intervalId = setInterval(() => {
      getColors().then(setColors);
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleReset = () => {
    setNewGoodName('');
    setNameError('');

    setSelectedColorId(0);
    setColorIdError('');
  };

  const handleCancel = () => {
    setNewGoodName(DEFAULT_GOOD_NAME);
    setNameError('');

    setSelectedColorId(DEFAULT_COLOR_ID);
    setColorIdError('');

    onCancel();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
      id: good?.id || Date.now(),
      name: newGoodName,
      colorId: selectedColorId,
      color: await getColorById(selectedColorId),
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
          value={selectedColorId}
          onChange={event => {
            setSelectedColorId(+event.target.value);
            setColorIdError('');
          }}
          className={cn({ 'with-error': colorIdError })}
        >
          <option value="0">Choose a color</option>

          {colors.map(color => (
            <option key={color.id} value={color.id}>
              {color.name}
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
