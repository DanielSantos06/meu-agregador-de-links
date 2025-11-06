import { useState } from 'react'; 
import axios from 'axios'; 
import { Link } from 'react-router-dom'; 

export function Register() {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault(); 
    
  
    setError('');
    setSuccess('');

    
    try {
      const response = await axios.post(
        'http://localhost:3000/register', 
        {
          name: name,
          email: email,
          username: username,
          password: password,
        }
      );

     
      setSuccess('Usuário criado com sucesso! Você pode fazer o login.');
      
   
      setName('');
      setEmail('');
      setUsername('');
      setPassword('');

    } catch (err) {
    
      setError('Erro ao criar usuário. O email ou username podem já existir.');
      console.error(err); 
    }
  }


  return (
    <div>
      <h2>Página de Registro</h2>
      
     
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} 
            required
          />
        </div>
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
          <label>Username (Apelido):</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
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
        {success && <p style={{ color: 'green' }}>{success}</p>}

        <button type="submit">Registrar</button>
      </form>
      
      <p>
        Já tem uma conta? <Link to="/">Faça o Login aqui</Link>
      </p>
    </div>
  );
}

