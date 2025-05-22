import React, { useState } from 'react';

const DesignSettings = () => {
  const [colors, setColors] = useState({
    primary: '#3b82f6',
    secondary: '#6b7280',
    accent: '#10b981',
    background: '#f3f4f6',
    text: '#1f2937'
  });
  
  const [fonts, setFonts] = useState({
    heading: 'Inter',
    body: 'Roboto',
    size: 'medium'
  });
  
  const [layout, setLayout] = useState({
    menuPosition: 'left',
    cardStyle: 'rounded',
    contentWidth: 'wide'
  });

  const handleColorChange = (key, value) => {
    setColors({
      ...colors,
      [key]: value
    });
  };

  const handleFontChange = (key, value) => {
    setFonts({
      ...fonts,
      [key]: value
    });
  };

  const handleLayoutChange = (key, value) => {
    setLayout({
      ...layout,
      [key]: value
    });
  };

  const saveSettings = () => {
    // In a real app, this would save to a database or localStorage
    alert('Настройки сохранены!');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Цветовая схема</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(colors).map(([key, value]) => (
            <div key={key} className="col-span-1">
              <label htmlFor={`color-${key}`} className="block text-sm font-medium text-gray-700 capitalize">
                {key === 'primary' ? 'Основной' : 
                 key === 'secondary' ? 'Вторичный' : 
                 key === 'accent' ? 'Акцентный' : 
                 key === 'background' ? 'Фон' : 'Текст'}
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="color"
                  id={`color-${key}`}
                  value={value}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  className="h-8 w-8 rounded-md border-gray-300 mr-2"
                />
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Шрифты</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label htmlFor="font-heading" className="block text-sm font-medium text-gray-700">
              Шрифт заголовков
            </label>
            <select
              id="font-heading"
              value={fonts.heading}
              onChange={(e) => handleFontChange('heading', e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
              <option value="Open Sans">Open Sans</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Lato">Lato</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="font-body" className="block text-sm font-medium text-gray-700">
              Шрифт основного текста
            </label>
            <select
              id="font-body"
              value={fonts.body}
              onChange={(e) => handleFontChange('body', e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="Roboto">Roboto</option>
              <option value="Inter">Inter</option>
              <option value="Open Sans">Open Sans</option>
              <option value="Lato">Lato</option>
              <option value="Noto Sans">Noto Sans</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="font-size" className="block text-sm font-medium text-gray-700">
              Размер шрифта
            </label>
            <select
              id="font-size"
              value={fonts.size}
              onChange={(e) => handleFontChange('size', e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="small">Маленький</option>
              <option value="medium">Средний</option>
              <option value="large">Большой</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Расположение элементов</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label htmlFor="menu-position" className="block text-sm font-medium text-gray-700">
              Позиция меню
            </label>
            <select
              id="menu-position"
              value={layout.menuPosition}
              onChange={(e) => handleLayoutChange('menuPosition', e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="left">Слева</option>
              <option value="top">Сверху</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="card-style" className="block text-sm font-medium text-gray-700">
              Стиль карточек
            </label>
            <select
              id="card-style"
              value={layout.cardStyle}
              onChange={(e) => handleLayoutChange('cardStyle', e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="rounded">Скругленные</option>
              <option value="sharp">Прямоугольные</option>
              <option value="elevated">С тенью</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="content-width" className="block text-sm font-medium text-gray-700">
              Ширина контента
            </label>
            <select
              id="content-width"
              value={layout.contentWidth}
              onChange={(e) => handleLayoutChange('contentWidth', e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="narrow">Узкая</option>
              <option value="medium">Средняя</option>
              <option value="wide">Широкая</option>
              <option value="full">На весь экран</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Специальные вставки</h2>
        <div>
          <label htmlFor="custom-css" className="block text-sm font-medium text-gray-700">
            Пользовательский CSS
          </label>
          <div className="mt-1">
            <textarea
              id="custom-css"
              rows={4}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder=".my-class { color: red; }"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Добавьте свои CSS-стили для кастомизации внешнего вида сайта.
          </p>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Отмена
          </button>
          <button
            type="button"
            onClick={saveSettings}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesignSettings;
