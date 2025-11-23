import React from 'react';
import ProductItem from './ProductItem';

export default function ProductList({ products, onAddToCart }) {
  return (
    <div className="row">
      {products.map(p => (
        <div className="col-md-4 mb-3" key={p.id}>
          <ProductItem product={p} onAdd={onAddToCart} />
        </div>
      ))}
    </div>
  );
}
