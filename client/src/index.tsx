import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import CartProvider from 'store/cart/cartProvider';
import PageProvider from 'store/page/pageProvider';
import App from './App';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api'
    : 'http://3.34.193.200/api';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <PageProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </PageProvider>
  </React.StrictMode>
);
