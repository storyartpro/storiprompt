import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Затемнение фона при открытом сайдбаре на мобильных устройствах */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      
      {/* Сайдбар */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:static md:h-auto md:w-auto md:shadow-none md:z-auto`}>
        <div className="p-4 border-b border-gray-200 flex justify-between items-center md:hidden">
          <span className="text-xl font-bold text-primary-600">СториPromt</span>
          <button 
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link 
                to="/" 
                className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => isOpen && toggleSidebar()}
              >
                Главная
              </Link>
            </li>
            <li>
              <Link 
                to="/exercises" 
                className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => isOpen && toggleSidebar()}
              >
                31 день упражнений
              </Link>
            </li>
            <li>
              <Link 
                to="/catalog" 
                className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => isOpen && toggleSidebar()}
              >
                Каталог промптов
              </Link>
            </li>
            <li>
              <Link 
                to="/templates" 
                className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => isOpen && toggleSidebar()}
              >
                Шаблоны
              </Link>
            </li>
            <li>
              <Link 
                to="/template-builder" 
                className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => isOpen && toggleSidebar()}
              >
                Шаблонизатор
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => isOpen && toggleSidebar()}
              >
                О проекте
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
