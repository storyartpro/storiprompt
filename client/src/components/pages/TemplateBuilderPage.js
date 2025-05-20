import React, { useState, useEffect } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/exportUtils';

const TemplateBuilderPage = () => {
  // Предустановленные варианты для выпадающих списков
  const presetOptions = {
    role: [
      'опытный маркетолог',
      'профессиональный копирайтер',
      'бизнес-аналитик',
      'UX-дизайнер',
      'SMM-специалист',
      'HR-менеджер',
      'финансовый консультант',
      'руководитель проекта',
      'SEO-специалист',
      'контент-стратег',
      'бренд-менеджер',
      'PR-специалист'
    ],
    context: [
      'запуск нового продукта',
      'ребрендинг компании',
      'выход на новый рынок',
      'кризисная ситуация',
      'сезонная акция',
      'конкурентный анализ',
      'работа с целевой аудиторией',
      'оптимизация бизнес-процессов',
      'повышение узнаваемости бренда',
      'разработка стратегии продвижения',
      'анализ потребительского поведения',
      'внутренние коммуникации'
    ],
    taskType: [
      'создай план маркетинговой кампании',
      'напиши текст для лендинга',
      'разработай контент-план на месяц',
      'проанализируй конкурентов',
      'составь список идей для постов',
      'создай email-рассылку',
      'разработай скрипт продаж',
      'предложи стратегию продвижения',
      'создай техническое задание',
      'напиши пресс-релиз',
      'разработай программу лояльности',
      'создай презентацию для клиента'
    ],
    responseFormat: [
      'структурированный список с пояснениями',
      'таблица с данными',
      'пошаговый план действий',
      'развернутый текст',
      'краткие тезисы',
      'формат вопрос-ответ',
      'сравнительный анализ',
      'инфографика (описание)',
      'чек-лист',
      'SWOT-анализ',
      'диаграмма с пояснениями',
      'схема процесса'
    ],
    limitations: [
      'бюджет 50000 рублей, срок 2 недели',
      'только цифровые каналы',
      'ограничение по объему - не более 1000 слов',
      'использование только бесплатных инструментов',
      'соответствие корпоративному стилю',
      'ориентация на B2B-аудиторию',
      'учет законодательных ограничений',
      'срок реализации - 1 месяц',
      'ограниченные человеческие ресурсы',
      'необходимость интеграции с существующими системами',
      'региональная специфика',
      'сезонные ограничения'
    ],
    example: [
      'Пример успешной кампании: [описание примера]',
      'Образец желаемого результата: [описание]',
      'Ссылка на аналогичный проект: [ссылка]',
      'Предыдущий опыт: [описание]',
      'Конкурентный пример: [описание]',
      'Желаемый формат: [пример формата]',
      'Стиль коммуникации: [пример стиля]',
      'Целевые показатели: [примеры KPI]',
      'Примеры успешных решений: [описание]',
      'Отраслевые стандарты: [примеры]',
      'Предпочтения целевой аудитории: [примеры]',
      'Исторические данные: [примеры]'
    ]
  };

  // Начальные параметры
  const initialParameters = [
    { id: 'role', name: 'Роль', value: '', isActive: true, isCustom: false },
    { id: 'context', name: 'Контекст', value: '', isActive: true, isCustom: false },
    { id: 'taskType', name: 'Задача', value: '', isActive: true, isCustom: false },
    { id: 'responseFormat', name: 'Формат ответа', value: '', isActive: true, isCustom: false },
    { id: 'limitations', name: 'Ограничения', value: '', isActive: true, isCustom: false },
    { id: 'example', name: 'Пример', value: '', isActive: true, isCustom: false }
  ];

  // Состояния
  const [parameters, setParameters] = useState(initialParameters);
  const [customParameterName, setCustomParameterName] = useState('');
  const [customParameterValue, setCustomParameterValue] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [savedTemplates, setSavedTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const [customInputs, setCustomInputs] = useState({
    role: '',
    context: '',
    taskType: '',
    responseFormat: '',
    limitations: '',
    example: ''
  });
  
  // Загрузка сохраненных шаблонов при монтировании компонента
  useEffect(() => {
    const templates = loadFromLocalStorage('promptTemplates') || [];
    setSavedTemplates(templates);
  }, []);
  
  // Генерация промпта при изменении параметров
  useEffect(() => {
    generatePrompt();
  }, [parameters]);
  
  // Функция генерации промпта на основе активных параметров
  const generatePrompt = () => {
    let prompt = '';
    
    parameters.forEach((param, index) => {
      if (param.isActive && param.value) {
        if (index > 0 && prompt !== '') {
          prompt += ' ';
        }
        
        if (param.id === 'role') {
          prompt += `Ты — ${param.value}.`;
        } else {
          prompt += `${param.name}: ${param.value}.`;
        }
      }
    });
    
    setGeneratedPrompt(prompt);
  };
  
  // Обработчик изменения значения параметра
  const handleParameterChange = (id, value) => {
    setParameters(prevParams => 
      prevParams.map(param => 
        param.id === id ? { ...param, value } : param
      )
    );
  };
  
  // Обработчик переключения активности параметра
  const handleToggleParameter = (id) => {
    setParameters(prevParams => 
      prevParams.map(param => 
        param.id === id ? { ...param, isActive: !param.isActive } : param
      )
    );
  };
  
  // Обработчик добавления пользовательского параметра
  const handleAddCustomParameter = () => {
    if (!customParameterName.trim()) {
      alert('Введите название параметра');
      return;
    }
    
    const newParamId = `custom_${Date.now()}`;
    
    setParameters(prevParams => [
      ...prevParams,
      {
        id: newParamId,
        name: customParameterName,
        value: customParameterValue,
        isActive: true,
        isCustom: true
      }
    ]);
    
    setCustomParameterName('');
    setCustomParameterValue('');
  };
  
  // Обработчик удаления параметра
  const handleRemoveParameter = (id) => {
    setParameters(prevParams => prevParams.filter(param => param.id !== id));
  };
  
  // Обработчик изменения пользовательского ввода
  const handleCustomInputChange = (id, value) => {
    setCustomInputs(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  // Обработчик применения пользовательского ввода
  const handleApplyCustomInput = (id) => {
    if (customInputs[id].trim()) {
      handleParameterChange(id, customInputs[id]);
      setCustomInputs(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };
  
  // Обработчик сохранения шаблона
  const handleSaveTemplate = () => {
    const activeParameters = parameters.filter(param => param.isActive && param.value);
    
    if (activeParameters.length === 0) {
      alert('Заполните хотя бы один параметр');
      return;
    }
    
    const templateName = prompt('Введите название шаблона:');
    if (!templateName) return;
    
    const newTemplate = {
      id: Date.now(),
      name: templateName,
      parameters: [...parameters],
      generatedPrompt
    };
    
    const updatedTemplates = [...savedTemplates, newTemplate];
    setSavedTemplates(updatedTemplates);
    saveToLocalStorage('promptTemplates', updatedTemplates);
    
    alert('Шаблон успешно сохранен!');
  };
  
  // Обработчик загрузки шаблона
  const handleLoadTemplate = (template) => {
    setParameters(template.parameters);
    setSelectedTemplate(template.id);
  };
  
  // Обработчик удаления шаблона
  const handleDeleteTemplate = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот шаблон?')) {
      const updatedTemplates = savedTemplates.filter(template => template.id !== id);
      setSavedTemplates(updatedTemplates);
      saveToLocalStorage('promptTemplates', updatedTemplates);
      
      if (selectedTemplate === id) {
        setSelectedTemplate(null);
      }
    }
  };
  
  // Обработчик копирования промпта
  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setShowCopyMessage(true);
    setTimeout(() => setShowCopyMessage(false), 2000);
  };
  
  // Обработчик очистки формы
  const handleClearForm = () => {
    setParameters(initialParameters);
    setCustomInputs({
      role: '',
      context: '',
      taskType: '',
      responseFormat: '',
      limitations: '',
      example: ''
    });
    setSelectedTemplate(null);
  };
  
  // Обработчик экспорта в PDF
  const handleExportPDF = () => {
    // Здесь будет реализована функция экспорта в PDF
    alert('Функция экспорта в PDF будет доступна в следующем обновлении');
  };
  
  // Обработчик отправки в каталог
  const handleSendToCatalog = () => {
    if (!generatedPrompt) {
      alert('Сначала сгенерируйте промпт');
      return;
    }
    
    const promptName = prompt('Введите название для промпта в каталоге:');
    if (!promptName) return;
    
    // Получаем текущий каталог промптов
    const currentCatalog = loadFromLocalStorage('promptCatalog') || [];
    
    // Создаем новый промпт для каталога
    const newCatalogPrompt = {
      id: Date.now(),
      title: promptName,
      promptText: generatedPrompt,
      description: 'Создано с помощью шаблонизатора',
      category: 'Пользовательские',
      tags: parameters
        .filter(param => param.isActive && param.value)
        .map(param => param.name),
      status: 'готов',
      author: 'Пользователь',
      createdAt: new Date().toISOString()
    };
    
    // Добавляем промпт в каталог
    const updatedCatalog = [...currentCatalog, newCatalogPrompt];
    saveToLocalStorage('promptCatalog', updatedCatalog);
    
    alert('Промпт успешно добавлен в каталог!');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Шаблонизатор промптов</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Левая колонка - форма */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Конструктор промпта</h2>
            
            {/* Параметры */}
            <div className="space-y-6">
              {parameters.map(param => (
                <div key={param.id} className={`p-4 rounded-lg border ${param.isActive ? 'border-blue-200 dark:border-blue-800' : 'border-gray-200 dark:border-gray-700'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`toggle-${param.id}`} 
                        checked={param.isActive} 
                        onChange={() => handleToggleParameter(param.id)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor={`toggle-${param.id}`} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {param.name}
                      </label>
                    </div>
                    
                    {param.isCustom && (
                      <button 
                        onClick={() => handleRemoveParameter(param.id)}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Удалить
                      </button>
                    )}
                  </div>
                  
                  {param.isActive && (
                    <div>
                      <select 
                        value={param.value} 
                        onChange={(e) => handleParameterChange(param.id, e.target.value)}
                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 mb-2"
                        disabled={!param.isActive}
                      >
                        <option value="">Выберите вариант</option>
                        {param.isCustom ? (
                          <option value={param.value}>{param.value}</option>
                        ) : (
                          presetOptions[param.id]?.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                          ))
                        )}
                        <option value="custom">Свой вариант...</option>
                      </select>
                      
                      {param.value === 'custom' && (
                        <div className="flex">
                          <input 
                            type="text" 
                            value={customInputs[param.id] || ''}
                            onChange={(e) => handleCustomInputChange(param.id, e.target.value)}
                            className="flex-1 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            placeholder={`Введите свой вариант для "${param.name}"`}
                          />
                          <button 
                            onClick={() => handleApplyCustomInput(param.id)}
                            className="ml-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            Применить
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Добавление пользовательского параметра */}
            <div className="mt-6 p-4 rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Добавить свой параметр</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input 
                  type="text" 
                  value={customParameterName}
                  onChange={(e) => setCustomParameterName(e.target.value)}
                  className="px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  placeholder="Название параметра"
                />
                
                <input 
                  type="text" 
                  value={customParameterValue}
                  onChange={(e) => setCustomParameterValue(e.target.value)}
                  className="px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  placeholder="Значение параметра"
                />
              </div>
              
              <button 
                onClick={handleAddCustomParameter}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Добавить параметр
              </button>
            </div>
            
            {/* Кнопки управления */}
            <div className="flex flex-wrap gap-2 mt-6">
              <button 
                onClick={handleSaveTemplate}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Сохранить шаблон
              </button>
              
              <button 
                onClick={handleClearForm}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Очистить
              </button>
              
              <button 
                onClick={handleExportPDF}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Экспорт в PDF
              </button>
              
              <button 
                onClick={handleSendToCatalog}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Отправить в каталог
              </button>
            </div>
          </div>
          
          {/* Сгенерированный промпт */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Сгенерированный промпт</h2>
              
              <button 
                onClick={handleCopyPrompt}
                className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
              >
                {showCopyMessage ? 'Скопировано!' : 'Копировать'}
              </button>
            </div>
            
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {generatedPrompt || 'Заполните поля выше для генерации промпта'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Правая колонка - сохраненные шаблоны */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Сохраненные шаблоны</h2>
            
            {savedTemplates.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                У вас пока нет сохраненных шаблонов
              </p>
            ) : (
              <div className="space-y-3">
                {savedTemplates.map(template => (
                  <div 
                    key={template.id} 
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedTemplate === template.id 
                        ? 'bg-blue-100 dark:bg-blue-900/30' 
                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-gray-900 dark:text-white">{template.name}</h3>
                      
                      <div className="flex space-x-1">
                        <button 
                          onClick={() => handleLoadTemplate(template)}
                          className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Загрузить
                        </button>
                        <button 
                          onClick={() => handleDeleteTemplate(template.id)}
                          className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                      {template.generatedPrompt}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Советы по составлению промптов */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Советы по составлению промптов</h2>
            
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Начинайте с четкого определения роли AI (эксперт, консультант, аналитик)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Добавляйте контекст, чтобы AI понимал ситуацию и ограничения</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Формулируйте конкретную задачу вместо общих запросов</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Указывайте желаемый формат ответа (список, таблица, текст)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Приводите примеры желаемого результата для большей точности</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateBuilderPage;
