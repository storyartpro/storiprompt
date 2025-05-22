import React, { useState, useEffect } from 'react';

const ContentManager = () => {
  const [activeTab, setActiveTab] = useState('prompts');
  const [prompts, setPrompts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  
  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate loading data
    setPrompts([
      { id: 1, title: 'SEO-карточка товара для WooCommerce', category: 'Бизнес-задачи', status: 'готов' },
      { id: 2, title: 'Анализ структуры сайта конкурентов', category: 'Бизнес-задачи', status: 'готов' },
      { id: 3, title: 'Структура информационной статьи по конкурентам', category: 'Генерация текста', status: 'готов' },
    ]);
    
    setCategories([
      { id: 1, name: 'Бизнес-задачи и маркетинг' },
      { id: 2, name: 'Генерация и редактирование текста' },
      { id: 3, name: 'Работа с данными' },
    ]);
    
    setTags([
      { id: 1, name: 'SEO' },
      { id: 2, name: 'WooCommerce' },
      { id: 3, name: 'контент' },
      { id: 4, name: 'структура' },
    ]);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'prompts':
        return (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {prompts.map((prompt) => (
                <li key={prompt.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-blue-600 truncate">{prompt.title}</p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {prompt.status}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          {prompt.category}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <button className="text-blue-600 hover:text-blue-800 mr-3">Редактировать</button>
                        <button className="text-red-600 hover:text-red-800">Удалить</button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="button"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Добавить промпт
              </button>
            </div>
          </div>
        );
      case 'categories':
        return (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {categories.map((category) => (
                <li key={category.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-blue-600 truncate">{category.name}</p>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <button className="text-blue-600 hover:text-blue-800 mr-3">Редактировать</button>
                        <button className="text-red-600 hover:text-red-800">Удалить</button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="button"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Добавить категорию
              </button>
            </div>
          </div>
        );
      case 'tags':
        return (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {tags.map((tag) => (
                <li key={tag.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-blue-600 truncate">{tag.name}</p>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <button className="text-blue-600 hover:text-blue-800 mr-3">Редактировать</button>
                        <button className="text-red-600 hover:text-red-800">Удалить</button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="button"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Добавить тег
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('prompts')}
            className={`${
              activeTab === 'prompts'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Промпты
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`${
              activeTab === 'categories'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Категории
          </button>
          <button
            onClick={() => setActiveTab('tags')}
            className={`${
              activeTab === 'tags'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Теги
          </button>
        </nav>
      </div>
      
      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ContentManager;
