import React, { useState } from 'react';

const TemplatesPage = () => {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      title: 'Анализ текста',
      whenToUse: 'Когда нужно глубоко проанализировать текст и выделить ключевые идеи',
      templateText: 'Ты — опытный аналитик текста. Проанализируй следующий текст и выдели: 1) Основные тезисы, 2) Аргументы, 3) Скрытые допущения, 4) Логические ошибки, если они есть.\n\nТекст для анализа: {{текст}}',
      example: 'Ты — опытный аналитик текста. Проанализируй следующий текст и выдели: 1) Основные тезисы, 2) Аргументы, 3) Скрытые допущения, 4) Логические ошибки, если они есть.\n\nТекст для анализа: Искусственный интеллект неизбежно превзойдет человеческий разум в ближайшие десятилетия. Уже сейчас нейросети способны создавать произведения искусства и писать код. Технологии развиваются экспоненциально, и скоро ИИ будет способен к самосовершенствованию. Когда это произойдет, человечество столкнется с экзистенциальным риском.',
      category: 'Анализ'
    },
    {
      id: 2,
      title: 'Генерация идей',
      whenToUse: 'Когда нужно получить множество креативных идей по заданной теме',
      templateText: 'Ты — креативный директор с 20-летним опытом. Предложи {{количество}} оригинальных идей для {{тема}}. Для каждой идеи укажи: 1) Краткое описание, 2) Ключевые преимущества, 3) Потенциальные сложности реализации.',
      example: 'Ты — креативный директор с 20-летним опытом. Предложи 5 оригинальных идей для мобильного приложения по изучению иностранных языков. Для каждой идеи укажи: 1) Краткое описание, 2) Ключевые преимущества, 3) Потенциальные сложности реализации.',
      category: 'Креатив'
    },
    {
      id: 3,
      title: 'Улучшение текста',
      whenToUse: 'Когда нужно улучшить качество и стиль текста',
      templateText: 'Ты — опытный редактор и стилист. Улучши следующий текст, сделав его более {{стиль}}, исправив ошибки и улучшив структуру. Сохрани основной смысл и ключевые идеи.\n\nИсходный текст: {{текст}}',
      example: 'Ты — опытный редактор и стилист. Улучши следующий текст, сделав его более профессиональным, исправив ошибки и улучшив структуру. Сохрани основной смысл и ключевые идеи.\n\nИсходный текст: Мы разработали новый продукт который поможет вам экономить время. Он очень простой в использовании и имеет много функций. Вы можете использовать его где угодно и когда угодно. Наш продукт лучше чем у конкурентов потому что он быстрее и дешевле.',
      category: 'Редактирование'
    }
  ]);

  const [categories] = useState(['Все', 'Анализ', 'Креатив', 'Редактирование', 'Обучение', 'Другое']);
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    title: '',
    whenToUse: '',
    templateText: '',
    example: '',
    category: 'Другое'
  });

  // Filter templates based on selected filters
  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'Все' || template.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.whenToUse.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.templateText.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const handleAddTemplate = () => {
    const newTemplateWithId = {
      ...newTemplate,
      id: templates.length + 1
    };
    
    setTemplates([...templates, newTemplateWithId]);
    setShowAddForm(false);
    setNewTemplate({
      title: '',
      whenToUse: '',
      templateText: '',
      example: '',
      category: 'Другое'
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Шаблон скопирован в буфер обмена');
      })
      .catch(err => {
        console.error('Ошибка при копировании: ', err);
      });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Шаблоны и инструкции</h1>
        <p className="text-gray-600 mb-6">
          Каталог шаблонов промптов и сценариев для различных задач.
          Используйте готовые шаблоны или создавайте свои.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Поиск шаблонов..."
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
            
            <button
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              onClick={() => setShowAddForm(true)}
            >
              Добавить шаблон
            </button>
          </div>
        </div>
      </div>
      
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Добавить новый шаблон</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Название</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={newTemplate.title}
                  onChange={(e) => setNewTemplate({...newTemplate, title: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Когда использовать</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="3"
                  value={newTemplate.whenToUse}
                  onChange={(e) => setNewTemplate({...newTemplate, whenToUse: e.target.value})}
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Текст шаблона</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="5"
                  value={newTemplate.templateText}
                  onChange={(e) => setNewTemplate({...newTemplate, templateText: e.target.value})}
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Пример</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="5"
                  value={newTemplate.example}
                  onChange={(e) => setNewTemplate({...newTemplate, example: e.target.value})}
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={newTemplate.category}
                  onChange={(e) => setNewTemplate({...newTemplate, category: e.target.value})}
                >
                  {categories.filter(c => c !== 'Все').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
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
                onClick={handleAddTemplate}
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{template.title}</h2>
                <p className="text-sm text-gray-600">Категория: {template.category}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="px-3 py-1 bg-primary-600 text-white text-sm rounded hover:bg-primary-700"
                  onClick={() => copyToClipboard(template.templateText)}
                >
                  Копировать
                </button>
                <button
                  className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded hover:bg-gray-300"
                >
                  Редактировать
                </button>
              </div>
            </div>
            
            <div className="px-6 py-4">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Когда использовать:</h3>
                <p className="text-gray-600">{template.whenToUse}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Шаблон:</h3>
                <div className="bg-gray-50 p-3 rounded border border-gray-200 whitespace-pre-wrap text-gray-800 font-mono text-sm">
                  {template.templateText}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Пример:</h3>
                <div className="bg-gray-50 p-3 rounded border border-gray-200 whitespace-pre-wrap text-gray-800 font-mono text-sm">
                  {template.example}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatesPage;
