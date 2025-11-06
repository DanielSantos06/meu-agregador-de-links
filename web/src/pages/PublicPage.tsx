import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';

interface Link {
  id: number;
  title: string;
  url: string;
}

interface PageData {
  id: number;
  name: string;
  username: string;
  links: Link[];
}

export function PublicPage() {
 
  const { username } = useParams();
  
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [error, setError] = useState('');

  
  useEffect(() => {
    if (!username) return; 

    async function fetchPageData() {
      try {
        const response = await axios.get(
          `http://localhost:3000/page/${username}` 
        );
        setPageData(response.data); 
      } catch (err) {
        setError("Página não encontrada.");
      }
    }
    
    fetchPageData();
  }, [username]); 


  if (error) {
    return <div><h2>{error}</h2></div>;
  }
  if (!pageData) {
    return <div>Carregando página...</div>;
  }

  return (
    <div style={{ textAlign: 'center' }}> 
      
      
      <h1>{pageData.name}</h1>
      <p>@{pageData.username}</p>
      
      <nav>
        
        <ul className="links-list"> 
          
          {pageData.links.length === 0 ? (
            <p>Este usuário ainda não cadastrou links.</p>
          ) : (
            pageData.links.map((link) => (
              <li key={link.id}>
                
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="link-button"
                >
                  {link.title}
                </a>
              </li>
            ))
          )}
        </ul>
      </nav>
    </div>
  );
}