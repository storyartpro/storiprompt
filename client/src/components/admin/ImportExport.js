import React, { useState } from 'react';
import Papa from 'papaparse';

const ImportExport = () => {
  const [activeTab, setActiveTab] = useState('import');
  const [csvFile, setCsvFile] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [importType, setImportType] = useState('prompts');
  const [exportType, setExportType] = useState('prompts');
  const [validationErrors, setValidationErrors] = useState([]);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCsvFile(file);
    
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setPreviewData(results.data);
          validateCsvData(results.data);
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
          setValidationErrors(['Ошибка при чтении CSV файла. Проверьте формат файла.']);
        }
      });
    }
  };
  
  const validateCsvData = (data) => {
    const errors = [];
    
    if (data.length === 0) {
      errors.push('CSV файл не содержит данных.');
      setValidationErrors(errors);
      return;
    }
    
    // Check required fields based on import type
    if (importType === 'prompts') {
      data.forEach((row, index) => {
        if (!row.title) {
          errors.push(`Строка ${index + 1}: Отсутствует обязательное поле "title".`);
        }
        if (!row.prompt_text) {
          errors.push(`Строка ${index + 1}: Отсутствует обязательное поле "prompt_text".`);
        }
      });
    } else if (importType === 'categories') {
      data.forEach((row, index) => {
        if (!row.name) {
          errors.push(`Строка ${index + 1}: Отсутствует обязательное поле "name".`);
        }
      });
    } else if (importType === 'tags') {
      data.forEach((row, index) => {
        if (!row.name) {
          errors.push(`Строка ${index + 1}: Отсутствует обязательное поле "name".`);
        }
      });
    }
    
    setValidationErrors(errors);
  };
  
  const handleImport = () => {
    if (validationErrors.length > 0) {
      alert('Пожалуйста, исправьте ошибки перед импортом.');
      return;
    }
    
    // In a real app, this would send data to an API
    alert(`Импортировано ${previewData.length} записей типа "${importType}"`);
    
    // Reset state
    setCsvFile(null);
    setPreviewData(null);
    setValidationErrors([]);
  };
  
  const handleExport = () => {
    // Mock data for export
    let dataToExport = [];
    
    if (exportType === 'prompts') {
      dataToExport = [
        { id: 1, title: 'SEO-карточка товара', prompt_text: 'Создай SEO-оптимизированную карточку...', category: 'Бизнес-задачи', status: 'готов' },
        { id: 2, title: 'Анализ структуры сайта', prompt_text: 'Проанализируй структуру сайта...', category: 'Бизнес-задачи', status: 'готов' },
      ];
    } else if (exportType === 'categories') {
      dataToExport = [
        { id: 1, name: 'Бизнес-задачи и маркетинг', description: 'Промпты для бизнес-задач' },
        { id: 2, name: 'Генерация и редактирование текста', description: 'Промпты для работы с текстом' },
      ];
    } else if (exportType === 'tags') {
      dataToExport = [
        { id: 1, name: 'SEO' },
        { id: 2, name: 'WooCommerce' },
        { id: 3, name: 'контент' },
      ];
    }
    
    // Convert to CSV
    const csv = Papa.unparse(dataToExport);
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${exportType}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('import')}
            className={`${
              activeTab === 'import'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Импорт CSV
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`${
              activeTab === 'export'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Экспорт CSV
          </button>
        </nav>
      </div>
      
      <div className="mt-6">
        {activeTab === 'import' ? (
          <div>
            <div className="mb-6">
              <label htmlFor="import-type" className="block text-sm font-medium text-gray-700">
                Тип данных для импорта
              </label>
              <select
                id="import-type"
                value={importType}
                onChange={(e) => setImportType(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="prompts">Промпты</option>
                <option value="categories">Категории</option>
                <option value="tags">Теги</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Загрузить CSV файл
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Загрузить файл</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        accept=".csv"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">или перетащите сюда</p>
                  </div>
                  <p className="text-xs text-gray-500">CSV до 10MB</p>
                </div>
              </div>
            </div>
            
            {validationErrors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-red-800">Ошибки валидации:</h3>
                <ul className="mt-2 text-sm text-red-700 list-disc pl-5">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {previewData && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Предпросмотр данных:</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {Object.keys(previewData[0]).map((key) => (
                          <th
                            key={key}
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {previewData.slice(0, 5).map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {Object.values(row).map((value, valueIndex) => (
                            <td
                              key={valueIndex}
                              className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                            >
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {previewData.length > 5 && (
                  <p className="mt-2 text-xs text-gray-500">
                    Показано 5 из {previewData.length} записей
                  </p>
                )}
              </div>
            )}
            
            <div className="flex justify-end">
              <button
                type="button"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleImport}
                disabled={!previewData || validationErrors.length > 0}
              >
                Импортировать
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <label htmlFor="export-type" className="block text-sm font-medium text-gray-700">
                Тип данных для экспорта
              </label>
              <select
                id="export-type"
                value={exportType}
                onChange={(e) => setExportType(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="prompts">Промпты</option>
                <option value="categories">Категории</option>
                <option value="tags">Теги</option>
              </select>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleExport}
              >
                Экспортировать CSV
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportExport;
