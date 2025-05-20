import React, { useState, useEffect } from 'react';

// Компонент для проверки локализации
const LocalizationTestComponent = () => {
  const [language, setLanguage] = useState('ru');
  
  // Словари локализации
  const translations = {
    ru: {
      title: 'Тест локализации',
      description: 'Этот компонент проверяет корректность локализации интерфейса.',
      currentLanguage: 'Текущий язык',
      changeLanguage: 'Изменить язык',
      testPhrases: 'Тестовые фразы',
      greeting: 'Здравствуйте, пользователь!',
      welcome: 'Добро пожаловать в СториPromt',
      instructions: 'Используйте приложение для создания эффективных промптов',
      dateFormat: 'Формат даты',
      today: 'Сегодня',
      numbers: 'Числа',
      thousand: 'Тысяча',
      million: 'Миллион'
    },
    en: {
      title: 'Localization Test',
      description: 'This component checks the correctness of interface localization.',
      currentLanguage: 'Current language',
      changeLanguage: 'Change language',
      testPhrases: 'Test phrases',
      greeting: 'Hello, user!',
      welcome: 'Welcome to StoryPromt',
      instructions: 'Use the application to create effective prompts',
      dateFormat: 'Date format',
      today: 'Today',
      numbers: 'Numbers',
      thousand: 'Thousand',
      million: 'Million'
    }
  };
  
  // Текущие переводы
  const t = translations[language];
  
  // Текущая дата
  const today = new Date();
  const formattedDate = language === 'ru' 
    ? today.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
    : today.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  
  // Форматирование чисел
  const thousand = language === 'ru' 
    ? '1 000'
    : '1,000';
  
  const million = language === 'ru' 
    ? '1 000 000'
    : '1,000,000';
  
  // Переключение языка
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ru' ? 'en' : 'ru');
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t.title}</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{t.description}</p>
      
      <div className="mb-4">
        <p className="text-gray-700 dark:text-gray-300">
          <span className="font-medium">{t.currentLanguage}:</span> {language === 'ru' ? 'Русский' : 'English'}
        </p>
        
        <button 
          onClick={toggleLanguage}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {t.changeLanguage}
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{t.testPhrases}</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
            <li>{t.greeting}</li>
            <li>{t.welcome}</li>
            <li>{t.instructions}</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{t.dateFormat}</h3>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">{t.today}:</span> {formattedDate}
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{t.numbers}</h3>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">{t.thousand}:</span> {thousand}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">{t.million}:</span> {million}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocalizationTestComponent;
