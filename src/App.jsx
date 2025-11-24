import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/global.css';
import PortfolioPage from './pages/Portfolio.jsx';
import AdminPage from './pages/Admin.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
