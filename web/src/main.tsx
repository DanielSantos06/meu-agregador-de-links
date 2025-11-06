import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// O Layout Global
import App from './App.tsx'; 

// As Páginas
import { Login } from './pages/Login.tsx';
import { Register } from './pages/Register.tsx';
import { Dashboard } from './pages/Dashboard.tsx';
import { PublicPage } from './pages/PublicPage.tsx';

// A "PONTE" MÁGICA PARA O NOSSO CSS!
import './index.css';

// A estrutura de rotas aninhada
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // O App (com <main>) é o "pai"
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/:username',
        element: <PublicPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);