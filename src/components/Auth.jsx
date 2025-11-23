import React, { useState } from 'react';
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export default function Auth() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [user,setUser] = useState(null);

  const register = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      alert('Usuario registrado');
    } catch(e){ alert(e.message); }
  };

  const login = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      alert('Login correcto');
    } catch(e){ alert(e.message); }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="card p-3">
      <h5>Auth (Firebase)</h5>
      <input className="form-control mb-2" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input type="password" className="form-control mb-2" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <div className="d-flex gap-2">
        <button className="btn btn-outline-primary" onClick={register}>Registrar</button>
        <button className="btn btn-primary" onClick={login}>Login</button>
        <button className="btn btn-secondary" onClick={logout}>Logout</button>
      </div>
      {user && <div className="mt-2"><strong>UID:</strong> {user.uid}</div>}
    </div>
  );
}
