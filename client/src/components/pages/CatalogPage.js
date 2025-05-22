import React, { useState, useEffect } from 'react';
import CatalogSidebar from '../common/CatalogSidebar';

const CatalogPage = () => {
  const [prompts, setPrompts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate loading data
    setPrompts([
      { id: 1, title: 'SEO-карточка товара для WooCommerce', category: 'Промпты для бизнес-задач', status: 'готов', description: 'Создание SEO-оптимизированных карточек товаров для интернет-магазина.' },
      { id: 2, title: 'Анализ структуры сайта конкурентов', category: 'Промпты для бизнес-задач', status: 'готов', description: 'Анализ недостающих элементов сайта по сравнению с конкурентами.' },
      { id: 3, title: 'Структура информационной статьи по конкурентам', category: 'Промпты для генерации текста', status: 'готов', description: 'Создание структуры статьи с ориентацией на лучшие практики конкурентов.' },
    ]);
  }, []);
  
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Filter prompts based on category and search query
  const filteredPrompts = prompts.filter((prompt) => {
    const matchesCategory = !selectedCategory || prompt.category.includes(selectedCategory);
    const matchesSearch = !searchQuery || 
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex">
      <CatalogSidebar onCategorySelect={handleCategorySelect} />
      
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4">Каталог промптов</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Поиск промптов..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={handleSearch}
            />
            <svg
              className="absolute right-3 top-3 h-6 w-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map((prompt) => (
            <div key={prompt.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{prompt.title}</h2>
              <p className="text-gray-600 mb-4">{prompt.description}</p>
              <div className="flex justify-between items-center">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  {prompt.status}
                </span>
                <button className="text-blue-600 hover:text-blue-800">
                  Подробнее
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
