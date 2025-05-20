import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isMobile, toggleSidebar }) => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Отслеживание скролла для изменения стиля навбара
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-30 transition-all ${
      isScrolled ? 'bg-white shadow-md' : 'bg-white bg-opacity-90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="inline-flex items-center justify-center p-2 rounded-md text-dark-600 hover:text-dark-900 hover:bg-dark-100 focus-ring"
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary-600">СториPromt</span>
            </Link>
          </div>
          
          {!isMobile && (
            <div className="hidden md:flex md:items-center md:space-x-4">
              <Link to="/exercises" className="px-3 py-2 rounded-md text-sm font-medium text-dark-600 hover:text-dark-900 hover:bg-dark-100 transition-colors">
                31 день упражнений
              </Link>
              <Link to="/catalog" className="px-3 py-2 rounded-md text-sm font-medium text-dark-600 hover:text-dark-900 hover:bg-dark-100 transition-colors">
                Каталог промптов
              </Link>
              <Link to="/templates" className="px-3 py-2 rounded-md text-sm font-medium text-dark-600 hover:text-dark-900 hover:bg-dark-100 transition-colors">
                Шаблоны
              </Link>
              <Link to="/template-builder" className="px-3 py-2 rounded-md text-sm font-medium text-dark-600 hover:text-dark-900 hover:bg-dark-100 transition-colors">
                Шаблонизатор
              </Link>
              <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium text-dark-600 hover:text-dark-900 hover:bg-dark-100 transition-colors">
                О проекте
              </Link>
            </div>
          )}
          
          <div className="flex items-center">
            <button className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus-ring transition-colors">
              Войти
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
