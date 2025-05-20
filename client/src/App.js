import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Импорт компонентов страниц
import HomePage from './components/pages/HomePage';
import ExercisesPage from './components/pages/ExercisesPage';
import CatalogPage from './components/pages/CatalogPage';
import TemplatesPage from './components/pages/TemplatesPage';
import TemplateBuilderPage from './components/pages/TemplateBuilderPage';
import AboutPage from './components/pages/AboutPage';

// Импорт компонентов макета
import Layout from './components/layouts/Layout';

// Импорт стилей
import './index.css';
import './styles/responsive.css';
import './styles/theme.css';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [darkMode, setDarkMode] = useState(false);

  // Отслеживание изменения размера окна для адаптивности
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Применение темной темы
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <Layout isMobile={isMobile} darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/exercises" element={<ExercisesPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/template-builder" element={<TemplateBuilderPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
