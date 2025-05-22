import React, { useState } from 'react';

const DesignSettings = () => {
  const [settings, setSettings] = useState(() => {
    // Load settings from localStorage or use defaults
    const storedSettings = localStorage.getItem('designSettings');
    return storedSettings ? JSON.parse(storedSettings) : {
      colors: {
        primary: '#3b82f6',
        secondary: '#10b981',
        background: '#ffffff',
        text: '#111827',
      },
      fonts: {
        heading: 'Roboto, sans-serif',
        body: 'Open Sans, sans-serif',
        size: 'medium',
      },
      layout: {
        sidebarPosition: 'left',
        contentWidth: 'wide',
        cardStyle: 'rounded',
      },
      customCss: '',
    };
  });
  
  const [activeTab, setActiveTab] = useState('colors');
  const [previewVisible, setPreviewVisible] = useState(false);
  
  const handleColorChange = (colorKey, value) => {
    setSettings({
      ...settings,
      colors: {
        ...settings.colors,
        [colorKey]: value
      }
    });
  };
  
  const handleFontChange = (fontKey, value) => {
    setSettings({
      ...settings,
      fonts: {
        ...settings.fonts,
        [fontKey]: value
      }
    });
  };
  
  const handleLayoutChange = (layoutKey, value) => {
    setSettings({
      ...settings,
      layout: {
        ...settings.layout,
        [layoutKey]: value
      }
    });
  };
  
  const handleCustomCssChange = (e) => {
    setSettings({
      ...settings,
      customCss: e.target.value
    });
  };
  
  const saveSettings = () => {
    localStorage.setItem('designSettings', JSON.stringify(settings));
    alert('Настройки сохранены!');
    
    // In a real app, this would apply the settings to the site
    // For now, we'll just save to localStorage
  };
  
  const resetSettings = () => {
    const defaultSettings = {
      colors: {
        primary: '#3b82f6',
        secondary: '#10b981',
        background: '#ffffff',
        text: '#111827',
      },
      fonts: {
        heading: 'Roboto, sans-serif',
        body: 'Open Sans, sans-serif',
        size: 'medium',
      },
      layout: {
        sidebarPosition: 'left',
        contentWidth: 'wide',
        cardStyle: 'rounded',
      },
      customCss: '',
    };
    
    setSettings(defaultSettings);
    localStorage.setItem('designSettings', JSON.stringify(defaultSettings));
    alert('Настройки сброшены до значений по умолчанию!');
  };
  
  const renderColorsTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Основной цвет</label>
        <div className="mt-1 flex items-center">
          <input
            type="color"
            value={settings.colors.primary}
            onChange={(e) => handleColorChange('primary', e.target.value)}
            className="h-8 w-8 rounded-md border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={settings.colors.primary}
            onChange={(e) => handleColorChange('primary', e.target.value)}
            className="ml-2 block w-24 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="ml-2 text-sm text-gray-500">Используется для кнопок, ссылок и акцентов</span>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Дополнительный цвет</label>
        <div className="mt-1 flex items-center">
          <input
            type="color"
            value={settings.colors.secondary}
            onChange={(e) => handleColorChange('secondary', e.target.value)}
            className="h-8 w-8 rounded-md border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={settings.colors.secondary}
            onChange={(e) => handleColorChange('secondary', e.target.value)}
            className="ml-2 block w-24 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="ml-2 text-sm text-gray-500">Используется для второстепенных элементов</span>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Цвет фона</label>
        <div className="mt-1 flex items-center">
          <input
            type="color"
            value={settings.colors.background}
            onChange={(e) => handleColorChange('background', e.target.value)}
            className="h-8 w-8 rounded-md border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={settings.colors.background}
            onChange={(e) => handleColorChange('background', e.target.value)}
            className="ml-2 block w-24 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="ml-2 text-sm text-gray-500">Основной цвет фона страницы</span>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Цвет текста</label>
        <div className="mt-1 flex items-center">
          <input
            type="color"
            value={settings.colors.text}
            onChange={(e) => handleColorChange('text', e.target.value)}
            className="h-8 w-8 rounded-md border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={settings.colors.text}
            onChange={(e) => handleColorChange('text', e.target.value)}
            className="ml-2 block w-24 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="ml-2 text-sm text-gray-500">Основной цвет текста</span>
        </div>
      </div>
    </div>
  );
  
  const renderFontsTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Шрифт заголовков</label>
        <select
          value={settings.fonts.heading}
          onChange={(e) => handleFontChange('heading', e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Roboto, sans-serif">Roboto</option>
          <option value="Montserrat, sans-serif">Montserrat</option>
          <option value="Playfair Display, serif">Playfair Display</option>
          <option value="Arial, sans-serif">Arial</option>
          <option value="Georgia, serif">Georgia</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Шрифт основного текста</label>
        <select
          value={settings.fonts.body}
          onChange={(e) => handleFontChange('body', e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Open Sans, sans-serif">Open Sans</option>
          <option value="Roboto, sans-serif">Roboto</option>
          <option value="Lato, sans-serif">Lato</option>
          <option value="Arial, sans-serif">Arial</option>
          <option value="Georgia, serif">Georgia</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Размер шрифта</label>
        <select
          value={settings.fonts.size}
          onChange={(e) => handleFontChange('size', e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="small">Маленький</option>
          <option value="medium">Средний</option>
          <option value="large">Большой</option>
        </select>
      </div>
    </div>
  );
  
  const renderLayoutTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Расположение боковой панели</label>
        <select
          value={settings.layout.sidebarPosition}
          onChange={(e) => handleLayoutChange('sidebarPosition', e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="left">Слева</option>
          <option value="right">Справа</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Ширина контента</label>
        <select
          value={settings.layout.contentWidth}
          onChange={(e) => handleLayoutChange('contentWidth', e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="narrow">Узкий</option>
          <option value="medium">Средний</option>
          <option value="wide">Широкий</option>
          <option value="full">На всю ширину</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Стиль карточек</label>
        <select
          value={settings.layout.cardStyle}
          onChange={(e) => handleLayoutChange('cardStyle', e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="rounded">Скругленные углы</option>
          <option value="sharp">Острые углы</option>
          <option value="elevated">С тенью</option>
          <option value="bordered">С рамкой</option>
        </select>
      </div>
    </div>
  );
  
  const renderCustomCssTab = () => (
    <div>
      <label className="block text-sm font-medium text-gray-700">Пользовательский CSS</label>
      <p className="mt-1 text-sm text-gray-500">
        Добавьте свои CSS-правила для дополнительной настройки внешнего вида сайта.
      </p>
      <textarea
        value={settings.customCss}
        onChange={handleCustomCssChange}
        rows="10"
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
        placeholder="/* Пример: */\n.header { background-color: #f3f4f6; }\n.footer { padding: 2rem 0; }"
      ></textarea>
    </div>
  );
  
  const renderPreview = () => (
    <div className="mt-8 border rounded-lg p-6" style={{ backgroundColor: settings.colors.background }}>
      <h2 className="text-2xl font-bold mb-4" style={{ 
        fontFamily: settings.fonts.heading,
        color: settings.colors.text
      }}>
        Предпросмотр настроек
      </h2>
      
      <p className="mb-4" style={{ 
        fontFamily: settings.fonts.body,
        color: settings.colors.text,
        fontSize: settings.fonts.size === 'small' ? '0.875rem' : 
                 settings.fonts.size === 'medium' ? '1rem' : '1.125rem'
      }}>
        Это пример текста с применёнными настройками дизайна. Вы можете увидеть, как будут выглядеть различные элементы на вашем сайте.
      </p>
      
      <div className="flex space-x-4 mb-4">
        <button style={{ 
          backgroundColor: settings.colors.primary,
          color: '#ffffff',
          padding: '0.5rem 1rem',
          borderRadius: settings.layout.cardStyle === 'rounded' ? '0.375rem' : '0',
          boxShadow: settings.layout.cardStyle === 'elevated' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
          border: settings.layout.cardStyle === 'bordered' ? '1px solid #e5e7eb' : 'none'
        }}>
          Основная кнопка
        </button>
        
        <button style={{ 
          backgroundColor: settings.colors.secondary,
          color: '#ffffff',
          padding: '0.5rem 1rem',
          borderRadius: settings.layout.cardStyle === 'rounded' ? '0.375rem' : '0',
          boxShadow: settings.layout.cardStyle === 'elevated' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
          border: settings.layout.cardStyle === 'bordered' ? '1px solid #e5e7eb' : 'none'
        }}>
          Дополнительная кнопка
        </button>
      </div>
      
      <div style={{ 
        backgroundColor: '#ffffff',
        padding: '1rem',
        borderRadius: settings.layout.cardStyle === 'rounded' ? '0.375rem' : '0',
        boxShadow: settings.layout.cardStyle === 'elevated' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
        border: settings.layout.cardStyle === 'bordered' ? '1px solid #e5e7eb' : 'none'
      }}>
        <h3 style={{ 
          fontFamily: settings.fonts.heading,
          color: settings.colors.text,
          fontSize: settings.fonts.size === 'small' ? '1.125rem' : 
                   settings.fonts.size === 'medium' ? '1.25rem' : '1.5rem',
          marginBottom: '0.5rem'
        }}>
          Пример карточки
        </h3>
        
        <p style={{ 
          fontFamily: settings.fonts.body,
          color: settings.colors.text,
          fontSize: settings.fonts.size === 'small' ? '0.875rem' : 
                   settings.fonts.size === 'medium' ? '1rem' : '1.125rem'
        }}>
          Это пример карточки с контентом. Здесь может быть размещена информация о промпте или другом элементе.
        </p>
        
        <a href="#" style={{ 
          color: settings.colors.primary,
          fontFamily: settings.fonts.body,
          textDecoration: 'underline',
          fontSize: settings.fonts.size === 'small' ? '0.875rem' : 
                   settings.fonts.size === 'medium' ? '1rem' : '1.125rem'
        }}>
          Подробнее
        </a>
      </div>
    </div>
  );
  
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`${
              activeTab === 'colors'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('colors')}
          >
            Цвета
          </button>
          <button
            className={`${
              activeTab === 'fonts'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('fonts')}
          >
            Шрифты
          </button>
          <button
            className={`${
              activeTab === 'layout'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('layout')}
          >
            Расположение
          </button>
          <button
            className={`${
              activeTab === 'customCss'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('customCss')}
          >
            Пользовательский CSS
          </button>
        </nav>
      </div>
      
      <div className="mt-6">
        {activeTab === 'colors' && renderColorsTab()}
        {activeTab === 'fonts' && renderFontsTab()}
        {activeTab === 'layout' && renderLayoutTab()}
        {activeTab === 'customCss' && renderCustomCssTab()}
        
        <div className="mt-8 flex justify-between items-center">
          <div>
            <button
              type="button"
              onClick={saveSettings}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Сохранить настройки
            </button>
            <button
              type="button"
              onClick={resetSettings}
              className="ml-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Сбросить настройки
            </button>
          </div>
          
          <button
            type="button"
            onClick={() => setPreviewVisible(!previewVisible)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {previewVisible ? 'Скрыть предпросмотр' : 'Показать предпросмотр'}
          </button>
        </div>
      </div>
      
      {previewVisible && renderPreview()}
    </div>
  );
};

export default DesignSettings;
