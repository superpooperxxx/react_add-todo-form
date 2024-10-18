import { GoodForm } from './GoodForm';
import { useGoodsMethods } from '../store/GoodsProvider';

export const AddGoodForm = () => {
  const { handleAddGood } = useGoodsMethods();

  return <GoodForm onSubmit={handleAddGood} />;
};
