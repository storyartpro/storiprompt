import React, { useState } from 'react';

const HomePage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Добро пожаловать в StoriPrompt</h1>
        <p className="text-xl text-gray-600">
          Ваша библиотека промптов для эффективной работы с искусственным интеллектом
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Каталог промптов</h2>
          <p className="text-gray-600 mb-4">
            Изучите нашу коллекцию готовых промптов для различных задач и областей применения.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Перейти в каталог
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Админ-панель</h2>
          <p className="text-gray-600 mb-4">
            Управляйте контентом, настраивайте дизайн и импортируйте/экспортируйте данные.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Войти в админ-панель
          </button>
        </div>
      </div>
      
      <div className="bg-gray-100 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Возможности приложения</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
              <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Библиотека промптов</h3>
            <p className="text-gray-600">
              Более 150 готовых промптов для различных задач
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
              <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Настройка дизайна</h3>
            <p className="text-gray-600">
              Гибкая настройка внешнего вида приложения
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
              <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Импорт/Экспорт</h3>
            <p className="text-gray-600">
              Удобный обмен данными в формате CSV
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
