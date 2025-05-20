import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DayCard from '../exercises/DayCard';
import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/exportUtils';

const ExercisesPage = () => {
  const [exercises, setExercises] = useState([]);
  const [activeDay, setActiveDay] = useState(1);
  const [totalTime, setTotalTime] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Загрузка данных упражнений
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        // Попытка загрузки из localStorage
        const savedExercises = loadFromLocalStorage('exercises');
        
        if (savedExercises && savedExercises.length > 0) {
          setExercises(savedExercises);
        } else {
          // Если в localStorage нет данных, загружаем из файла
          const response = await fetch('/data/exercises.json');
          if (!response.ok) {
            throw new Error('Не удалось загрузить упражнения');
          }
          const data = await response.json();
          setExercises(data);
          saveToLocalStorage('exercises', data);
        }
        
        // Определение активного дня (текущий день или первый невыполненный)
        const today = new Date();
        const todayFormatted = `${today.getDate().toString().padStart(2, '0')}.${(today.getMonth() + 1).toString().padStart(2, '0')}.${today.getFullYear()}`;
        
        // Проверяем, есть ли упражнение на сегодня
        const todayExercise = savedExercises?.find(ex => ex.date === todayFormatted);
        if (todayExercise) {
          setActiveDay(todayExercise.day);
        } else {
          // Если нет упражнения на сегодня, находим первое невыполненное
          const firstIncomplete = savedExercises?.find(ex => ex.status !== 'выполнено');
          if (firstIncomplete) {
            setActiveDay(firstIncomplete.day);
          }
        }
        
        calculateStats(savedExercises || []);
      } catch (error) {
        console.error('Ошибка при загрузке упражнений:', error);
        
        // Если не удалось загрузить данные, создаем базовый набор упражнений
        const defaultExercises = generateDefaultExercises();
        setExercises(defaultExercises);
        saveToLocalStorage('exercises', defaultExercises);
        calculateStats(defaultExercises);
      } finally {
        setLoading(false);
      }
    };
    
    fetchExercises();
  }, []);

  // Генерация базового набора упражнений, если не удалось загрузить данные
  const generateDefaultExercises = () => {
    const exercises = [];
    const baseDate = new Date('2025-05-19');
    
    const exerciseTitles = [
      'Промпт 5W+H',
      '3 стиля — 1 задача',
      'Контент-комбо',
      'Обратное проектирование',
      'Играй с ролями',
      'Мини-комбо-проект',
      'Формализуй мысль',
      'Один запрос — 5 форматов',
      'Промпт-рефакторинг',
      'Цепочка промптов',
      'Промпт-шаблоны',
      'Сравнительный анализ',
      'Промпт-челлендж',
      'Промпт-дебаты',
      'Промпт-ревью',
      'Промпт-оптимизация',
      'Промпт-эксперимент',
      'Промпт-кейс',
      'Промпт-интервью',
      'Промпт-презентация',
      'Промпт-сторителлинг',
      'Промпт-визуализация',
      'Промпт-аналитика',
      'Промпт-синтез',
      'Промпт-трансформация',
      'Промпт-адаптация',
      'Промпт-интеграция',
      'Промпт-инновация',
      'Промпт-рефлексия',
      'Промпт-мастерство',
      'Промпт-финал'
    ];
    
    const exerciseDescriptions = [
      'Разложи задачу на 6 вопросов: Who (Кто?), What (Что?), When (Когда?), Where (Где?), Why (Зачем?), How (Как?). Это помогает задать максимально ясный и контекстный промпт.\nПример: Who: маркетолог | What: пишет пост | When: сегодня | Where: ВКонтакте | Why: для прогрева | How: через сторителлинг.\n→ Сформулируй промпт на основе этих ответов.',
      'Выбери одну задачу (например, «Напиши оффер для рекламы») и перепиши её в 3 стилях:\n1. Дружелюбный\n2. Деловой\n3. Эмоциональный.\nЦель: понять, как стиль влияет на восприятие.',
      'Один продукт или тема — 5 форматов контента:\n1. Лендинг\n2. Пост в соцсетях\n3. Email-рассылка\n4. Баннер\n5. Заголовок объявления.\nЦель: развить гибкость подачи и креативное мышление.',
      'Возьми любой удачный результат от ChatGPT и попробуй придумать, какой промпт мог его вызвать. Сформулируй 1–2 версии. Сравни их и сделай вывод, что сработало лучше.',
      'Оформи один и тот же запрос в разных ролях: маркетолог, дизайнер, начинающий предприниматель. Сравни разницу в ответах. Это поможет понять, как влияют вводные роли на стиль и содержание ответа.',
      'Создай мини-комбо-промпт: объедини несколько шагов в одном запросе.\nПример: «Проанализируй конкурента, оформи в таблицу и предложи 3 улучшения для моего лендинга».',
      'Выбери одну свою сырую идею (например, «сделать гайд»), оформи в промпт по структуре: роль + контекст + задача + формат + стиль. Это упражнение на чёткость.',
      'Создай 5 разных форматов контента по одной теме или товару:\n1. Пост в соцсети\n2. Лендинг\n3. Email-рассылка\n4. Инфографика\n5. Заголовок баннера.\nЦель: научиться адаптировать информацию под разные каналы.',
      'Возьми существующий промпт и улучши его, добавив:\n1. Более четкую роль\n2. Контекст\n3. Критерии качества\n4. Формат вывода\nСравни результаты до и после улучшения.',
      'Создай цепочку из 3 связанных промптов, где каждый следующий использует результат предыдущего. Например: анализ → структурирование → создание контента.',
      'Изучи и примени 3 разных шаблона промптов:\n1. Ролевой (Ты — эксперт...)\n2. Пошаговый (Шаг 1..., Шаг 2...)\n3. Форматный (Создай таблицу с...)\nСравни эффективность каждого для своей задачи.',
      'Выбери одну тему и создай два противоположных промпта: один для аргументов "за", другой для аргументов "против". Проанализируй, как формулировка влияет на результат.',
      'Придумай сложный промпт с несколькими условиями и ограничениями. Затем попробуй его упростить, сохранив ключевые требования. Сравни результаты.',
      'Создай два промпта с противоположными точками зрения на одну тему. Используй результаты для создания третьего, сбалансированного промпта.',
      'Обменяйся промптами с коллегой или другом. Проведите взаимный анализ и предложите улучшения. Отметьте сильные и слабые стороны.',
      'Возьми рабочий промпт и оптимизируй его, сократив количество слов на 30%, но сохранив все ключевые элементы. Сравни результаты.',
      'Создай экспериментальный промпт, используя необычный подход или метафору. Например, "Представь, что маркетинговая стратегия — это рецепт блюда...".',
      'Разработай промпт для решения реальной бизнес-задачи. Протестируй его на практике и запиши результаты и выводы.',
      'Создай промпт в формате интервью, где ты задаешь серию последовательных вопросов для глубокого исследования темы.',
      'Разработай промпт для создания презентации по выбранной теме. Включи требования к структуре, стилю и визуальным элементам.',
      'Создай промпт, использующий принципы сторителлинга для более эффективной коммуникации идеи или концепции.',
      'Разработай промпт для создания визуального контента: инфографики, диаграммы или схемы по выбранной теме.',
      'Создай аналитический промпт для глубокого исследования темы, тренда или проблемы с разных точек зрения.',
      'Разработай промпт, объединяющий информацию из разных источников или областей знаний для создания нового контента.',
      'Создай промпт для трансформации существующего контента в новый формат или для новой аудитории.',
      'Разработай промпт для адаптации контента под различные платформы или каналы коммуникации.',
      'Создай промпт, интегрирующий несколько инструментов или методик для решения комплексной задачи.',
      'Разработай инновационный промпт, использующий нестандартный подход или новую методику работы с AI.',
      'Создай промпт для анализа и оценки твоего прогресса в промпт-инжиниринге за прошедший период.',
      'Разработай мастер-промпт, демонстрирующий все ключевые навыки и техники, которые ты освоил.',
      'Создай финальный промпт-проект, объединяющий все изученные техники для решения значимой задачи.'
    ];
    
    for (let i = 0; i < 31; i++) {
      const currentDate = new Date(baseDate);
      currentDate.setDate(baseDate.getDate() + i);
      const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}.${(currentDate.getMonth() + 1).toString().padStart(2, '0')}.${currentDate.getFullYear()}`;
      
      exercises.push({
        day: i + 1,
        date: formattedDate,
        title: exerciseTitles[i] || `Упражнение ${i + 1}`,
        description: exerciseDescriptions[i] || `Описание упражнения ${i + 1}`,
        status: 'не начато',
        timeSpent: 0,
        notes: '',
        rating: 0
      });
    }
    
    return exercises;
  };

  // Расчет статистики
  const calculateStats = (exercises) => {
    const completed = exercises.filter(ex => ex.status === 'выполнено');
    setCompletedCount(completed.length);
    
    const totalTimeSpent = exercises.reduce((sum, ex) => sum + (ex.timeSpent || 0), 0);
    setTotalTime(totalTimeSpent);
    
    const ratings = completed.map(ex => ex.rating).filter(r => r > 0);
    const avgRating = ratings.length > 0 
      ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length 
      : 0;
    setAverageRating(avgRating);
  };

  // Обработчики событий
  const handleDayComplete = (day) => {
    const updatedExercises = exercises.map(ex => {
      if (ex.day === day) {
        return { ...ex, status: 'выполнено' };
      }
      return ex;
    });
    
    setExercises(updatedExercises);
    saveToLocalStorage('exercises', updatedExercises);
    calculateStats(updatedExercises);
    
    // Автоматический переход к следующему невыполненному упражнению
    const nextIncomplete = updatedExercises.find(ex => ex.day > day && ex.status !== 'выполнено');
    if (nextIncomplete) {
      setActiveDay(nextIncomplete.day);
    }
  };

  const handleSaveNotes = (day, notes) => {
    const updatedExercises = exercises.map(ex => {
      if (ex.day === day) {
        return { ...ex, notes };
      }
      return ex;
    });
    
    setExercises(updatedExercises);
    saveToLocalStorage('exercises', updatedExercises);
  };

  const handleUpdateTime = (day, time) => {
    const updatedExercises = exercises.map(ex => {
      if (ex.day === day) {
        return { ...ex, timeSpent: time };
      }
      return ex;
    });
    
    setExercises(updatedExercises);
    saveToLocalStorage('exercises', updatedExercises);
    calculateStats(updatedExercises);
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(exercises, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `31-days-prompts-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        if (Array.isArray(importedData) && importedData.length > 0) {
          setExercises(importedData);
          saveToLocalStorage('exercises', importedData);
          calculateStats(importedData);
        }
      } catch (error) {
        console.error('Ошибка при импорте данных:', error);
        alert('Не удалось импортировать данные. Проверьте формат файла.');
      }
    };
    reader.readAsText(file);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">31 день промт-практики</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Общая статистика</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Выполнено упражнений</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{completedCount} из 31</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${(completedCount / 31) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Общее время</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalTime} мин</p>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Средняя оценка</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {averageRating.toFixed(1)}
              <span className="text-yellow-400 ml-1">★</span>
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-between mt-4">
          <div className="flex space-x-2 mb-2">
            <button 
              onClick={handleExportData}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Экспорт данных
            </button>
            
            <label className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer">
              Импорт данных
              <input 
                type="file" 
                accept=".json" 
                onChange={handleImportData} 
                className="hidden" 
              />
            </label>
          </div>
          
          <div className="flex items-center">
            <label className="text-sm text-gray-700 dark:text-gray-300 mr-2">Перейти к дню:</label>
            <select 
              value={activeDay} 
              onChange={(e) => setActiveDay(parseInt(e.target.value))}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {exercises.map(ex => (
                <option key={ex.day} value={ex.day}>
                  День {ex.day} - {ex.status === 'выполнено' ? '✓' : ex.status === 'в процессе' ? '⋯' : '○'}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Активная карточка дня */}
      {exercises.find(ex => ex.day === activeDay) && (
        <DayCard 
          {...exercises.find(ex => ex.day === activeDay)} 
          isActive={true}
          onComplete={handleDayComplete}
          onSaveNotes={handleSaveNotes}
          onUpdateTime={handleUpdateTime}
        />
      )}
      
      {/* Список всех дней */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Все упражнения</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exercises.map(ex => (
            <div 
              key={ex.day}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow ${
                ex.status === 'выполнено' 
                  ? 'border-l-4 border-green-500' 
                  : ex.status === 'в процессе' 
                    ? 'border-l-4 border-yellow-500' 
                    : 'border-l-4 border-gray-300'
              }`}
              onClick={() => setActiveDay(ex.day)}
            >
              <div className="flex justify-between items-center">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold px-2.5 py-0.5 rounded">
                  День {ex.day}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{ex.date}</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mt-2">{ex.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{ex.description}</p>
              
              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-1 ${
                    ex.status === 'выполнено' 
                      ? 'bg-green-500' 
                      : ex.status === 'в процессе' 
                        ? 'bg-yellow-500' 
                        : 'bg-gray-300'
                  }`}></span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {ex.status === 'выполнено' 
                      ? 'Выполнено' 
                      : ex.status === 'в процессе' 
                        ? 'В процессе' 
                        : 'Не начато'}
                  </span>
                </div>
                
                {ex.timeSpent > 0 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {ex.timeSpent} мин
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExercisesPage;
