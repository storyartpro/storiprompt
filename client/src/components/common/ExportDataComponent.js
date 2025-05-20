import React, { useState, useEffect } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/exportUtils';

const ExportDataComponent = () => {
  const [exportFormat, setExportFormat] = useState('json');
  const [dataType, setDataType] = useState('all');
  const [exportStatus, setExportStatus] = useState('');

  // Функция экспорта данных
  const handleExport = () => {
    try {
      setExportStatus('Подготовка данных для экспорта...');
      
      // Загрузка данных в зависимости от выбранного типа
      let dataToExport = {};
      
      if (dataType === 'all' || dataType === 'exercises') {
        const exercises = loadFromLocalStorage('exercises') || [];
        dataToExport.exercises = exercises;
      }
      
      if (dataType === 'all' || dataType === 'prompts') {
        const prompts = loadFromLocalStorage('promptCatalog') || [];
        dataToExport.prompts = prompts;
      }
      
      if (dataType === 'all' || dataType === 'templates') {
        const templates = loadFromLocalStorage('promptTemplates') || [];
        dataToExport.templates = templates;
      }
      
      // Экспорт в зависимости от выбранного формата
      if (exportFormat === 'json') {
        exportAsJSON(dataToExport);
      } else if (exportFormat === 'csv') {
        exportAsCSV(dataToExport);
      }
      
      setExportStatus('Экспорт успешно завершен!');
      setTimeout(() => setExportStatus(''), 3000);
    } catch (error) {
      console.error('Ошибка при экспорте данных:', error);
      setExportStatus('Ошибка при экспорте данных');
      setTimeout(() => setExportStatus(''), 3000);
    }
  };
  
  // Экспорт в формате JSON
  const exportAsJSON = (data) => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `storiprompt_export_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // Экспорт в формате CSV
  const exportAsCSV = (data) => {
    // Функция для преобразования объекта в строку CSV
    const objectToCSV = (obj) => {
      const headers = Object.keys(obj[0] || {}).join(',');
      const rows = obj.map(item => 
        Object.values(item).map(value => 
          typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value
        ).join(',')
      );
      
      return [headers, ...rows].join('\n');
    };
    
    // Создаем отдельные CSV для каждого типа данных
    Object.entries(data).forEach(([key, value]) => {
      if (value && value.length > 0) {
        const csvString = objectToCSV(value);
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `storiprompt_${key}_${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    });
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Экспорт данных</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Формат экспорта
          </label>
          <select 
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value)}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Тип данных
          </label>
          <select 
            value={dataType}
            onChange={(e) => setDataType(e.target.value)}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            <option value="all">Все данные</option>
            <option value="exercises">Только упражнения</option>
            <option value="prompts">Только промпты</option>
            <option value="templates">Только шаблоны</option>
          </select>
        </div>
        
        <button 
          onClick={handleExport}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Экспортировать данные
        </button>
        
        {exportStatus && (
          <div className="mt-2 text-center text-sm font-medium text-green-600 dark:text-green-400">
            {exportStatus}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportDataComponent;
