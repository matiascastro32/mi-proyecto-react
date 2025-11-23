import React, { Component } from 'react';

class CartClass extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  addItem = (product) => {
    this.setState(prev => {
      const exists = prev.items.find(i => i.id === product.id);
      if (exists) {
        return { items: prev.items.map(i => i.id === product.id ? {...i, qty: i.qty + 1} : i) };
      }
      return { items: [...prev.items, {...product, qty: 1}] };
    });
  }

  removeItem = (id) => {
    this.setState(prev => ({ items: prev.items.filter(i => i.id !== id) }));
  }

  render() {
    const total = this.state.items.reduce((s,i)=> s + i.price * i.qty, 0);
    return (
      <div className="card p-3">
        <h5>Carrito</h5>
        {this.state.items.length === 0 ? <p>Vacío</p> : (
          <ul className="list-group">
            {this.state.items.map(i=>(
              <li key={i.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>{i.name} <small className="text-muted">x{i.qty}</small></div>
                <div>
                  <strong>${i.price * i.qty}</strong>
                  <button className="btn btn-sm btn-danger ms-2" onClick={()=>this.removeItem(i.id)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <hr />
        <div className="d-flex justify-content-between">
          <strong>Total:</strong> <span>${total}</span>
        </div>
      </div>
    );
  }
}

export default CartClass;
