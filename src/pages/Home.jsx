import React, { useRef } from 'react';
import products from '../products';
import ProductList from '../components/ProductList';
import CartClass from '../components/CartClass';
import FormContact from '../components/FormContact';
import Auth from '../components/Auth';

export default function Home(){
  const cartRef = useRef();
  const handleAdd = (p) => {
    if (cartRef.current && cartRef.current.addItem) cartRef.current.addItem(p);
  };
  return (
    <div>
      <div className="row">
        <div className="col-md-8">
          <h2>Productos</h2>
          <ProductList products={products} onAddToCart={handleAdd} />
          <hr />
          <FormContact />
        </div>
        <div className="col-md-4">
          <Auth />
          <hr />
          <CartClass ref={cartRef} />
        </div>
      </div>
    </div>
  );
}
