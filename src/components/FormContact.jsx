import React, { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function FormContact() {
  const [form,setForm] = useState({name:'', email:'', message:''});
  const [, forceUpdate] = useState();
  const validator = useRef(new SimpleReactValidator({ autoForceUpdate: { forceUpdate: () => forceUpdate({}) } }));

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
      try {
        await addDoc(collection(db,'contacts'), {...form, createdAt: serverTimestamp()});
        alert('Mensaje guardado en Firestore');
        setForm({name:'', email:'', message:''});
      } catch(err){ console.error(err); alert('Error guardando'); }
    } else {
      validator.current.showMessages();
      forceUpdate({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3">
      <h5>Contacto</h5>
      <input name="name" value={form.name} onChange={handleChange} className="form-control mb-2" placeholder="Nombre" />
      {validator.current.message('name', form.name, 'required|min:3')}
      <input name="email" value={form.email} onChange={handleChange} className="form-control mb-2" placeholder="Email" />
      {validator.current.message('email', form.email, 'required|email')}
      <textarea name="message" value={form.message} onChange={handleChange} className="form-control mb-2" placeholder="Mensaje" />
      {validator.current.message('message', form.message, 'required|min:10')}
      <button className="btn btn-success">Enviar</button>
    </form>
  );
}
