import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); 

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:3000/login',
        {
          email: email,
          password: password,
        }
      );

      localStorage.setItem('userData', JSON.stringify(response.data));

      navigate('/dashboard');

    } catch (err) {
      setError('Email ou senha inválidos.');
      console.error(err);
    }
  }

  return (
    <div>
      <h2>Página de Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Entrar</button>
      </form>

      <p>
        Não tem uma conta? <Link to="/register">Registre-se aqui</Link>
      </p>
    </div>
  );
}