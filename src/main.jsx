import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { SiteContentProvider } from './context/SiteContentContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SiteContentProvider>
      <App />
    </SiteContentProvider>
  </React.StrictMode>,
);
