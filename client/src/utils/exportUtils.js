import React from 'react';

// Функция для сохранения данных в localStorage
export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Ошибка при сохранении в localStorage:', error);
    return false;
  }
};

// Функция для загрузки данных из localStorage
export const loadFromLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Ошибка при загрузке из localStorage:', error);
    return null;
  }
};

// Функция для экспорта данных в CSV
export const exportToCSV = (data, filename) => {
  if (!data || !data.length) {
    console.error('Нет данных для экспорта');
    return;
  }

  // Получаем заголовки из первого объекта
  const headers = Object.keys(data[0]);
  
  // Создаем строки данных
  const csvRows = [];
  
  // Добавляем заголовки
  csvRows.push(headers.join(','));
  
  // Добавляем строки данных
  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header];
      // Экранируем кавычки и оборачиваем значение в кавычки, если оно содержит запятую
      const escaped = typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
      return escaped;
    });
    csvRows.push(values.join(','));
  }
  
  // Объединяем все строки с переносами строк
  const csvString = csvRows.join('\\n');
  
  // Создаем Blob и ссылку для скачивания
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  // Создаем временную ссылку для скачивания
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename || 'export.csv');
  link.style.visibility = 'hidden';
  
  // Добавляем ссылку в DOM, кликаем по ней и удаляем
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Функция для экспорта данных в JSON
export const exportToJSON = (data, filename) => {
  if (!data) {
    console.error('Нет данных для экспорта');
    return;
  }

  // Создаем Blob и ссылку для скачивания
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  // Создаем временную ссылку для скачивания
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename || 'export.json');
  link.style.visibility = 'hidden';
  
  // Добавляем ссылку в DOM, кликаем по ней и удаляем
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Компонент кнопки экспорта
export const ExportButton = ({ data, format, filename, label }) => {
  const handleExport = () => {
    if (format === 'csv') {
      exportToCSV(data, filename);
    } else if (format === 'json') {
      exportToJSON(data, filename);
    }
  };

  return (
    <button
      onClick={handleExport}
      className="px-3 py-1.5 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-sm"
    >
      {label || `Экспорт ${format.toUpperCase()}`}
    </button>
  );
};

export default {
  saveToLocalStorage,
  loadFromLocalStorage,
  exportToCSV,
  exportToJSON,
  ExportButton
};
