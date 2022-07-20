import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ProductDetails from './pages/ProductDetails/ProductDetails'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ProductDetails id={1} />
);

