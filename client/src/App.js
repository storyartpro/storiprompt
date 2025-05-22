import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import HomePage from './components/pages/HomePage';
import CatalogPage from './components/pages/CatalogPage';
import AdminPage from './components/pages/AdminPage';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">StoryPromt</Link>
            <nav>
              <ul className="flex space-x-4">
                <li><Link to="/" className="hover:underline">Главная</Link></li>
                <li><Link to="/catalog" className="hover:underline">Каталог промптов</Link></li>
                <li><Link to="/admin" className="hover:underline">Админ-панель</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        
        <footer className="bg-gray-800 text-white p-4 mt-8">
          <div className="container mx-auto text-center">
            <p>&copy; 2025 StoriPrompt. Все права защищены.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
