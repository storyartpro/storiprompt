import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-bold text-primary-600">СториPromt</span>
            <p className="text-sm text-gray-600 mt-1">
              Платформа для обучения промт-инжинирингу
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="mb-4 md:mb-0">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Навигация</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><a href="/" className="hover:text-primary-600">Главная</a></li>
                <li><a href="/exercises" className="hover:text-primary-600">31 день упражнений</a></li>
                <li><a href="/catalog" className="hover:text-primary-600">Каталог промптов</a></li>
                <li><a href="/templates" className="hover:text-primary-600">Шаблоны</a></li>
                <li><a href="/template-builder" className="hover:text-primary-600">Шаблонизатор</a></li>
                <li><a href="/about" className="hover:text-primary-600">О проекте</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Контакты</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Email: info@storiprompt.ru</li>
                <li>Telegram: @storiprompt</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} СториPromt. Все права защищены.
          </p>
          
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Условия использования
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Политика конфиденциальности
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
