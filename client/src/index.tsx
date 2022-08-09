import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import CartProvider from 'store/cart/cartProvider';
import PageProvider from 'store/page/pageProvider';
import App from './App';

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:3000';
}

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
