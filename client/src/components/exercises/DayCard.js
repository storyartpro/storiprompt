import React, { useState, useEffect } from 'react';

const DayCard = ({ 
  day, 
  date, 
  title, 
  description, 
  isActive = false, 
  onComplete, 
  onSaveNotes,
  onUpdateTime
}) => {
  const [status, setStatus] = useState('не начато'); // не начато, в процессе, выполнено
  const [timeSpent, setTimeSpent] = useState(0); // в минутах
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [notes, setNotes] = useState('');
  const [rating, setRating] = useState(0);
  const [showBonus, setShowBonus] = useState(false);
  const [bonusPrompt, setBonusPrompt] = useState('');
  const [dayConclusion, setDayConclusion] = useState('');
  const [advancedPrompts, setAdvancedPrompts] = useState([]);

  // Загрузка сохраненных данных при монтировании компонента
  useEffect(() => {
    const savedData = localStorage.getItem(`day-${day}`);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setStatus(parsedData.status || 'не начато');
      setTimeSpent(parsedData.timeSpent || 0);
      setNotes(parsedData.notes || '');
      setRating(parsedData.rating || 0);
      setShowBonus(parsedData.status === 'выполнено');
    }
    
    // Генерация бонус-промта и вывода дня на основе упражнения
    setBonusPrompt(`Используй этот промт для повышения эффективности: "Ты — опытный промт-инженер. Помоги мне улучшить следующий промт для ${title}: [вставьте ваш промт]. Предложи 3 конкретных улучшения с объяснением, почему они сделают промт эффективнее."`);
    setDayConclusion(`Ключевой вывод дня: Практика "${title}" помогает развить навык структурирования запросов и понимания контекста. Продолжайте применять этот подход в повседневных задачах.`);
    
    // Генерация вариантов усложнения промта
    setAdvancedPrompts([
      "Добавьте ограничение по объему ответа",
      "Попросите предоставить ответ в определенном формате (таблица, список, схема)",
      "Укажите конкретную аудиторию для ответа"
    ]);
  }, [day, title]);

  // Сохранение данных при изменении
  useEffect(() => {
    const dataToSave = {
      status,
      timeSpent,
      notes,
      rating
    };
    localStorage.setItem(`day-${day}`, JSON.stringify(dataToSave));
    
    // Вызов колбэка для обновления времени в родительском компоненте
    if (onUpdateTime) {
      onUpdateTime(day, timeSpent);
    }
  }, [day, status, timeSpent, notes, rating, onUpdateTime]);

  // Обработка таймера
  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        const now = new Date();
        const elapsedMinutes = Math.floor((now - startTime) / (1000 * 60));
        setTimeSpent(prevTime => prevTime + 1);
      }, 60000); // Обновление каждую минуту
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, startTime]);

  const handleStartTimer = () => {
    if (status === 'не начато') {
      setStatus('в процессе');
    }
    setIsTimerRunning(true);
    setStartTime(new Date());
  };

  const handleStopTimer = () => {
    setIsTimerRunning(false);
  };

  const handleComplete = () => {
    setStatus('выполнено');
    setIsTimerRunning(false);
    setShowBonus(true);
    if (onComplete) {
      onComplete(day);
    }
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
    if (onSaveNotes) {
      onSaveNotes(day, e.target.value);
    }
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 ${isActive ? 'border-2 border-blue-500' : ''}`}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold px-2.5 py-0.5 rounded">День {day}</span>
          <span className="ml-2 text-gray-500 dark:text-gray-400 text-sm">{date}</span>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Статус:</span>
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="не начато">Не начато</option>
            <option value="в процессе">В процессе</option>
            <option value="выполнено">Выполнено</option>
          </select>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      
      <div className="mb-4">
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{description}</p>
      </div>
      
      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Варианты усложнения:</h4>
        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
          {advancedPrompts.map((prompt, index) => (
            <li key={index}>{prompt}</li>
          ))}
        </ul>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Результаты и заметки:
        </label>
        <textarea 
          value={notes} 
          onChange={handleNotesChange}
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          rows="4"
          placeholder="Запишите ваши результаты, мысли и заметки здесь..."
        ></textarea>
      </div>
      
      <div className="flex flex-wrap items-center justify-between mb-4">
        <div className="flex items-center mb-2 sm:mb-0">
          <span className="text-sm text-gray-700 dark:text-gray-300 mr-2">Время:</span>
          <div className="flex items-center">
            <input 
              type="number" 
              value={timeSpent} 
              onChange={(e) => setTimeSpent(parseInt(e.target.value) || 0)}
              className="w-16 px-2 py-1 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              min="0"
            />
            <span className="ml-1 text-sm text-gray-700 dark:text-gray-300">мин</span>
            
            {isTimerRunning ? (
              <button 
                onClick={handleStopTimer}
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded-lg text-xs"
              >
                Стоп
              </button>
            ) : (
              <button 
                onClick={handleStartTimer}
                className="ml-2 px-2 py-1 bg-green-500 text-white rounded-lg text-xs"
              >
                Старт
              </button>
            )}
          </div>
        </div>
        
        <div className="flex items-center">
          <span className="text-sm text-gray-700 dark:text-gray-300 mr-2">Оценка:</span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingChange(star)}
                className={`${
                  rating >= star ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                } text-lg focus:outline-none`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input 
            type="checkbox" 
            id={`complete-${day}`} 
            checked={status === 'выполнено'} 
            onChange={() => status === 'выполнено' ? setStatus('в процессе') : handleComplete()}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor={`complete-${day}`} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Упражнение выполнено
          </label>
        </div>
        
        {!isActive && (
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Перейти к упражнению
          </button>
        )}
      </div>
      
      {showBonus && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Вывод дня:</h4>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{dayConclusion}</p>
          
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Бонус-промт:</h4>
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300">{bonusPrompt}</p>
            <button 
              className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => {
                navigator.clipboard.writeText(bonusPrompt);
              }}
            >
              Копировать
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DayCard;
