import { Navbar } from './components/navbar.js';
import { Header } from './components/header.js';

const app = document.getElementById("app");
app.append(Navbar(), Header());

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ComentariosReact from './components/ComentariosReact.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ComentariosReact />
  </StrictMode>
)
