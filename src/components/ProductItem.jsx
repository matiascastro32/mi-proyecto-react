import React from 'react';

export default function ProductItem({ product, onAdd }) {
  return (
    <div className="card h-100">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <strong>${product.price}</strong>
          <button className="btn btn-primary" onClick={() => onAdd(product)}>Añadir</button>
        </div>
      </div>
    </div>
  );
}
