import React, { useState, useEffect } from 'react';

// Компонент для проверки адаптивности
const ResponsiveTestComponent = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    isDesktop: window.innerWidth >= 1024
  });

  // Обновление размеров экрана при изменении окна
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768,
        isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
        isDesktop: window.innerWidth >= 1024
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Тест адаптивности</h2>
      
      <div className="space-y-2">
        <p className="text-gray-700 dark:text-gray-300">
          <span className="font-medium">Текущее разрешение:</span> {screenSize.width} x {screenSize.height}
        </p>
        
        <p className="text-gray-700 dark:text-gray-300">
          <span className="font-medium">Тип устройства:</span>{' '}
          {screenSize.isMobile ? 'Мобильное устройство' : 
           screenSize.isTablet ? 'Планшет' : 'Десктоп'}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg text-center">
            <p className="text-blue-800 dark:text-blue-200">Видно только на мобильных</p>
            <p className="md:hidden text-blue-600 dark:text-blue-300">✓ Отображается</p>
            <p className="hidden md:block text-red-600 dark:text-red-300">✗ Скрыто</p>
          </div>
          
          <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg text-center">
            <p className="text-green-800 dark:text-green-200">Видно только на планшетах</p>
            <p className="hidden md:block lg:hidden text-green-600 dark:text-green-300">✓ Отображается</p>
            <p className="block md:hidden lg:block text-red-600 dark:text-red-300">✗ Скрыто</p>
          </div>
          
          <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg text-center">
            <p className="text-purple-800 dark:text-purple-200">Видно только на десктопах</p>
            <p className="hidden lg:block text-purple-600 dark:text-purple-300">✓ Отображается</p>
            <p className="block lg:hidden text-red-600 dark:text-red-300">✗ Скрыто</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveTestComponent;
