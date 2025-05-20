import React from 'react';

const HomePage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Добро пожаловать в СториPromt</h1>
        <p className="text-xl text-gray-600">
          Платформа для обучения и совершенствования навыков промт-инжиниринга
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold text-primary-600 mb-4">31 день промт-упражнений</h2>
          <p className="text-gray-600 mb-4">
            Ежедневные упражнения для развития навыков создания эффективных промптов.
            Отслеживайте свой прогресс и улучшайте результаты.
          </p>
          <a 
            href="/exercises" 
            className="inline-block px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
          >
            Начать упражнения
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold text-primary-600 mb-4">Каталог промптов</h2>
          <p className="text-gray-600 mb-4">
            Библиотека готовых промптов для различных задач.
            Добавляйте, редактируйте и используйте промпты из каталога.
          </p>
          <a 
            href="/catalog" 
            className="inline-block px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
          >
            Перейти в каталог
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-primary-600 mb-3">Шаблоны и инструкции</h2>
          <p className="text-gray-600 mb-4">
            Готовые шаблоны и инструкции для создания эффективных промптов.
          </p>
          <a 
            href="/templates" 
            className="text-primary-600 hover:text-primary-800 font-medium"
          >
            Изучить шаблоны →
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-primary-600 mb-3">Шаблонизатор</h2>
          <p className="text-gray-600 mb-4">
            Конструктор промптов по готовым шаблонам для быстрого создания эффективных запросов.
          </p>
          <a 
            href="/template-builder" 
            className="text-primary-600 hover:text-primary-800 font-medium"
          >
            Создать промпт →
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-primary-600 mb-3">О проекте</h2>
          <p className="text-gray-600 mb-4">
            Узнайте больше о проекте, его целях и авторах.
          </p>
          <a 
            href="/about" 
            className="text-primary-600 hover:text-primary-800 font-medium"
          >
            Подробнее →
          </a>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Начните прямо сейчас</h2>
        <p className="text-gray-600 mb-6">
          Выберите один из разделов и начните совершенствовать свои навыки промт-инжиниринга.
          Регулярная практика поможет вам достичь лучших результатов в работе с AI.
        </p>
        <div className="flex flex-wrap gap-4">
          <a 
            href="/exercises" 
            className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
          >
            Упражнения
          </a>
          <a 
            href="/catalog" 
            className="px-4 py-2 bg-secondary-600 text-white rounded hover:bg-secondary-700 transition-colors"
          >
            Каталог
          </a>
          <a 
            href="/template-builder" 
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Шаблонизатор
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
