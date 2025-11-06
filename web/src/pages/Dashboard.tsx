import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Link {
  id: number;
  title: string;
  url: string;
}

interface UserData {
  id: number;
  name: string;
  email: string;
  username: string;
}

export function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserData | null>(null); 
  const [links, setLinks] = useState<Link[]>([]); 
  const [title, setTitle] = useState(''); 
  const [url, setUrl] = useState(''); 
  const [error, setError] = useState('');

  useEffect(() => {
  
    const userDataString = localStorage.getItem('userData');

    if (!userDataString) {
      
      navigate('/');
      return;
    }

    const userData = JSON.parse(userDataString) as UserData;
    setUser(userData);

    fetchLinks(userData.id);
  }, [navigate]); 

  async function fetchLinks(userId: number) {
    try {
      const response = await axios.get(
        `http://localhost:3000/links/${userId}` 
      );
      setLinks(response.data); 
    } catch (err) {
      console.error("Erro ao buscar links:", err);
      setError("Não foi possível carregar seus links.");
    }
  }

  async function handleCreateLink(event: React.FormEvent) {
    event.preventDefault();
    setError('');

    if (!user) return; 

    try {

      await axios.post('http://localhost:3000/links', {
        title: title,
        url: url,
        userId: user.id, 
      });

      setTitle('');
      setUrl('');
 
      fetchLinks(user.id);
      
    } catch (err) {
      console.error("Erro ao criar link:", err);
      setError("Não foi possível criar o link.");
    }
  }
 
  function handleLogout() {
    localStorage.removeItem('userData'); 
    navigate('/'); 
  }

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      
      <h2>Meu Dashboard - ({user.username})</h2>
      <p>Bem-vindo, {user.name}!</p>
      
      <button onClick={handleLogout}>Sair (Logout)</button>
      
      <hr />

      <h3>Criar Novo Link</h3>
      <form onSubmit={handleCreateLink}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>URL:</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://exemplo.com"
            required
          />
        </div>
        <button type="submit">Criar Link</button>
      </form>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <hr />

      <h3>Meus Links</h3>
      {links.length === 0 ? (
        <p>Você ainda não criou nenhum link.</p>
      ) : (
        <ul>
          {links.map((link) => (
            <li key={link.id}>
              <strong>{link.title}</strong>: <a href={link.url} target="_blank">{link.url}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}