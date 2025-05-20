import React, { useState, useEffect } from 'react';
import { ExportButton, saveToLocalStorage, loadFromLocalStorage } from '../../utils/exportUtils';

const CatalogPage = () => {
  const [prompts, setPrompts] = useState([
    {
      id: 1,
      title: 'Анализ текста',
      promptText: 'Проанализируй следующий текст и выдели ключевые идеи, тезисы и аргументы: {{текст}}',
      description: 'Промпт для глубокого анализа текстов любой сложности',
      category: 'Анализ',
      tags: ['текст', 'анализ', 'идеи'],
      status: 'готов',
      author: 'Система'
    },
    {
      id: 2,
      title: 'Генерация идей',
      promptText: 'Предложи 10 креативных идей для {{тема}} с учетом следующих ограничений: {{ограничения}}',
      description: 'Промпт для генерации креативных идей по заданной теме',
      category: 'Креатив',
      tags: ['идеи', 'креатив', 'брейншторм'],
      status: 'готов',
      author: 'Система'
    },
    {
      id: 3,
      title: 'Улучшение текста',
      promptText: 'Улучши следующий текст, сделав его более {{стиль}}, сохраняя основной смысл: {{текст}}',
      description: 'Промпт для улучшения качества и стиля текста',
      category: 'Редактирование',
      tags: ['текст', 'стиль', 'редактирование'],
      status: 'тест',
      author: 'Система'
    }
  ]);

  // Загрузка данных из localStorage при монтировании компонента
  useEffect(() => {
    const savedPrompts = loadFromLocalStorage('catalog_prompts');
    if (savedPrompts && savedPrompts.length > 0) {
      setPrompts(savedPrompts);
    } else {
      // Если в localStorage нет данных, попробуем загрузить импортированные промпты
      try {
        const importedPrompts = require('../../data/imported_prompts.json');
        
        // Объединяем существующие промпты с импортированными
        const combinedPrompts = [...prompts];
        
        // Добавляем импортированные промпты с новыми ID
        importedPrompts.forEach((prompt, index) => {
          combinedPrompts.push({
            ...prompt,
            id: prompts.length + index + 1
          });
        });
        
        setPrompts(combinedPrompts);
      } catch (error) {
        console.error('Ошибка при загрузке импортированных промптов:', error);
      }
    }
  }, []);

  // Сохранение данных в localStorage при изменении промптов
  useEffect(() => {
    if (prompts.length > 0) {
      saveToLocalStorage('catalog_prompts', prompts);
    }
  }, [prompts]);

  const [categories] = useState(['Все', 'Анализ', 'Креатив', 'Редактирование', 'Обучение', 'Другое', 'Соцсети', 'Бизнес', 'Программирование', 'Личное развитие']);
  const [statuses] = useState(['Все', 'тест', 'готов', 'в работе']);
  
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedStatus, setSelectedStatus] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPrompt, setNewPrompt] = useState({
    title: '',
    promptText: '',
    description: '',
    category: 'Другое',
    tags: '',
    status: 'тест',
    author: 'Пользователь'
  });

  // Get all unique tags from prompts
  const allTags = [...new Set(prompts.flatMap(prompt => prompt.tags))];

  // Filter prompts based on selected filters
  const filteredPrompts = prompts.filter(prompt => {
    const matchesCategory = selectedCategory === 'Все' || prompt.category === selectedCategory;
    const matchesStatus = selectedStatus === 'Все' || prompt.status === selectedStatus;
    const matchesSearch = searchQuery === '' || 
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.promptText.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => prompt.tags.includes(tag));
    
    return matchesCategory && matchesStatus && matchesSearch && matchesTags;
  });

  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleAddPrompt = () => {
    const tagsArray = newPrompt.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    const newPromptWithId = {
      ...newPrompt,
      id: prompts.length + 1,
      tags: tagsArray
    };
    
    setPrompts([...prompts, newPromptWithId]);
    setShowAddForm(false);
    setNewPrompt({
      title: '',
      promptText: '',
      description: '',
      category: 'Другое',
      tags: '',
      status: 'тест',
      author: 'Пользователь'
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Промпт скопирован в буфер обмена');
      })
      .catch(err => {
        console.error('Ошибка при копировании: ', err);
      });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Каталог промптов</h1>
        <p className="text-gray-600 mb-6">
          Библиотека готовых промптов для различных задач.
          Добавляйте, редактируйте и используйте промпты из каталога.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Поиск промптов..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            
            <button
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              onClick={() => setShowAddForm(true)}
            >
              Добавить промпт
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Фильтр по тегам:</h3>
          <div className="flex flex-wrap gap-2">
            {allTags.slice(0, 20).map(tag => (
              <button
                key={tag}
                className={`px-3 py-1 text-sm rounded-full ${
                  selectedTags.includes(tag) 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-md mb-6 flex flex-col md:flex-row justify-between items-center">
          <div>
            <p className="text-gray-700">
              <span className="font-medium">Всего промптов в каталоге:</span> {prompts.length}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Найдено по фильтрам:</span> {filteredPrompts.length}
            </p>
          </div>
          
          <div className="flex gap-3 mt-4 md:mt-0">
            <ExportButton 
              data={filteredPrompts} 
              format="csv" 
              filename="prompts_export.csv" 
              label="Экспорт в CSV" 
            />
            <ExportButton 
              data={filteredPrompts} 
              format="json" 
              filename="prompts_export.json" 
              label="Экспорт в JSON" 
            />
          </div>
        </div>
      </div>
      
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Добавить новый промпт</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Название</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={newPrompt.title}
                  onChange={(e) => setNewPrompt({...newPrompt, title: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Текст промпта</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="5"
                  value={newPrompt.promptText}
                  onChange={(e) => setNewPrompt({...newPrompt, promptText: e.target.value})}
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Описание задачи</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="3"
                  value={newPrompt.description}
                  onChange={(e) => setNewPrompt({...newPrompt, description: e.target.value})}
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={newPrompt.category}
                    onChange={(e) => setNewPrompt({...newPrompt, category: e.target.value})}
                  >
                    {categories.filter(c => c !== 'Все').map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={newPrompt.status}
                    onChange={(e) => setNewPrompt({...newPrompt, status: e.target.value})}
                  >
                    {statuses.filter(s => s !== 'Все').map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Теги (через запятую)</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="текст, анализ, идеи"
                  value={newPrompt.tags}
                  onChange={(e) => setNewPrompt({...newPrompt, tags: e.target.value})}
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                onClick={() => setShowAddForm(false)}
              >
                Отмена
              </button>
              <button
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                onClick={handleAddPrompt}
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Название
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Промпт
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Категория
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Теги
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Статус
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPrompts.slice(0, 50).map((prompt) => (
              <tr key={prompt.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{prompt.title}</div>
                  <div className="text-sm text-gray-500">{prompt.author}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-md">
                    <div className="line-clamp-2">{prompt.promptText}</div>
                    <div className="mt-1 text-xs text-gray-500">{prompt.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{prompt.category}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {prompt.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-800">
                        {tag}
                      </span>
                    ))}
                    {prompt.tags.length > 3 && (
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-800">
                        +{prompt.tags.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    prompt.status === 'готов' ? 'bg-green-100 text-green-800' :
                    prompt.status === 'тест' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {prompt.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    className="text-primary-600 hover:text-primary-900 mr-3"
                    onClick={() => copyToClipboard(prompt.promptText)}
                  >
                    Копировать
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    Редактировать
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredPrompts.length > 50 && (
          <div className="bg-gray-50 px-6 py-3 text-center">
            <p className="text-sm text-gray-700">
              Показано 50 из {filteredPrompts.length} промптов. Уточните поиск для более точных результатов.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
