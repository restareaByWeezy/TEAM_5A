import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

import { store } from './states';
import './styles/index.scss';

import App from './pages';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnMount: false } },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
