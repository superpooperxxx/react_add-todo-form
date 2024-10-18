import { createRoot } from 'react-dom/client';
import { App } from './App';
import { GoodsProvider } from './store/GoodsProvider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <GoodsProvider>
    <App />
  </GoodsProvider>,
);
