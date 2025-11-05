import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App.tsx';
import '@/index.css';

// We will NOT wrap <App /> in AuthProvider or BrowserRouter here,
// because App.tsx is already handling its own providers and router.
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);