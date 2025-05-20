import React from 'react';

const MobileMenu = ({ onClose }) => {
  return (
    <div className="fixed inset-y-0 left-0 w-3/4 max-w-xs bg-white shadow-lg z-50" onClick={(e) => e.stopPropagation()}>
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h2 className="text-xl font-bold text-primary-600">СториPromt</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-4">
          <nav className="space-y-2">
            <a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">
              Главная
            </a>
            <a href="/exercises" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">
              31 день промт-упражнений
            </a>
            <a href="/catalog" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">
              Каталог промптов
            </a>
            <a href="/templates" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">
              Шаблоны и инструкции
            </a>
            <a href="/template-builder" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">
              Шаблонизатор
            </a>
            <a href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">
              О проекте
            </a>
          </nav>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Статистика
            </h3>
            <div className="mt-2 space-y-1 px-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Выполнено упражнений:</span>
                <span className="font-medium">0/31</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Создано промптов:</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Средняя оценка:</span>
                <span className="font-medium">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
