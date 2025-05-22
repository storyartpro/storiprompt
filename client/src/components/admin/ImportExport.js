import React, { useState } from 'react';
import Papa from 'papaparse';

const ImportExport = () => {
  const [activeTab, setActiveTab] = useState('import');
  const [importType, setImportType] = useState('prompts');
  const [exportType, setExportType] = useState('prompts');
  const [csvFile, setCsvFile] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [importStatus, setImportStatus] = useState(null);
  
  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCsvFile(file);
    
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setPreviewData(results.data);
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
          setImportStatus({
            success: false,
            message: `Ошибка при чтении файла: ${error.message}`
          });
        }
      });
    } else {
      setPreviewData(null);
    }
  };
  
  // Handle import
  const handleImport = () => {
    if (!csvFile || !previewData) {
      setImportStatus({
        success: false,
        message: 'Пожалуйста, выберите файл CSV для импорта'
      });
      return;
    }
    
    try {
      // Validate data based on import type
      let isValid = true;
      let errorMessage = '';
      
      if (importType === 'prompts') {
        // Check if required fields exist
        const requiredFields = ['title', 'content', 'category'];
        for (const field of requiredFields) {
          if (!previewData[0].hasOwnProperty(field)) {
            isValid = false;
            errorMessage = `Отсутствует обязательное поле: ${field}`;
            break;
          }
        }
      } else if (importType === 'categories') {
        // Check if required fields exist
        if (!previewData[0].hasOwnProperty('name')) {
          isValid = false;
          errorMessage = 'Отсутствует обязательное поле: name';
        }
      } else if (importType === 'tags') {
        // Check if required fields exist
        if (!previewData[0].hasOwnProperty('name')) {
          isValid = false;
          errorMessage = 'Отсутствует обязательное поле: name';
        }
      }
      
      if (!isValid) {
        setImportStatus({
          success: false,
          message: errorMessage
        });
        return;
      }
      
      // Process and save data
      let existingData = [];
      const storageKey = importType;
      
      const storedData = localStorage.getItem(storageKey);
      if (storedData) {
        existingData = JSON.parse(storedData);
      }
      
      // Transform CSV data to match our data structure
      const newData = previewData.map((item, index) => {
        const newItem = { ...item, id: Date.now() + index };
        
        // Handle special fields
        if (importType === 'prompts' && item.tags) {
          newItem.tags = item.tags.split(',').map(tag => tag.trim());
        }
        
        return newItem;
      });
      
      // Merge existing and new data
      const mergedData = [...existingData, ...newData];
      
      // Save to localStorage
      localStorage.setItem(storageKey, JSON.stringify(mergedData));
      
      setImportStatus({
        success: true,
        message: `Успешно импортировано ${newData.length} записей`
      });
    } catch (error) {
      console.error('Import error:', error);
      setImportStatus({
        success: false,
        message: `Ошибка при импорте: ${error.message}`
      });
    }
  };
  
  // Handle export
  const handleExport = () => {
    try {
      // Get data from localStorage
      const storageKey = exportType;
      const storedData = localStorage.getItem(storageKey);
      
      if (!storedData) {
        setImportStatus({
          success: false,
          message: `Нет данных для экспорта типа: ${exportType}`
        });
        return;
      }
      
      const data = JSON.parse(storedData);
      
      // Transform data for CSV export
      const exportData = data.map(item => {
        const exportItem = { ...item };
        
        // Handle special fields
        if (exportType === 'prompts' && Array.isArray(item.tags)) {
          exportItem.tags = item.tags.join(', ');
        }
        
        // Remove id field
        delete exportItem.id;
        
        return exportItem;
      });
      
      // Convert to CSV
      const csv = Papa.unparse(exportData);
      
      // Create download link
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${exportType}_export_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setImportStatus({
        success: true,
        message: `Успешно экспортировано ${exportData.length} записей`
      });
    } catch (error) {
      console.error('Export error:', error);
      setImportStatus({
        success: false,
        message: `Ошибка при экспорте: ${error.message}`
      });
    }
  };
  
  const renderImportTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Тип данных для импорта</label>
        <select
          value={importType}
          onChange={(e) => setImportType(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="prompts">Промпты</option>
          <option value="categories">Категории</option>
          <option value="tags">Теги</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Файл CSV</label>
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
                  className="sr-only"
                  accept=".csv"
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-1">или перетащите сюда</p>
            </div>
            <p className="text-xs text-gray-500">CSV до 10MB</p>
          </div>
        </div>
      </div>
      
      {previewData && previewData.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900">Предпросмотр данных</h3>
          <div className="mt-2 overflow-x-auto">
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
                    {Object.keys(previewData[0]).map((key) => (
                      <td key={`${rowIndex}-${key}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {previewData.length > 5 && (
              <p className="mt-2 text-sm text-gray-500">
                Показано 5 из {previewData.length} строк
              </p>
            )}
          </div>
          
          <div className="mt-4">
            <button
              type="button"
              onClick={handleImport}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Импортировать данные
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
  const renderExportTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Тип данных для экспорта</label>
        <select
          value={exportType}
          onChange={(e) => setExportType(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="prompts">Промпты</option>
          <option value="categories">Категории</option>
          <option value="tags">Теги</option>
        </select>
      </div>
      
      <div>
        <button
          type="button"
          onClick={handleExport}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Экспортировать в CSV
        </button>
      </div>
    </div>
  );
  
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`${
              activeTab === 'import'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('import')}
          >
            Импорт
          </button>
          <button
            className={`${
              activeTab === 'export'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('export')}
          >
            Экспорт
          </button>
        </nav>
      </div>
      
      <div className="mt-6">
        {activeTab === 'import' ? renderImportTab() : renderExportTab()}
        
        {importStatus && (
          <div className={`mt-4 p-4 rounded-md ${importStatus.success ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="flex">
              <div className="flex-shrink-0">
                {importStatus.success ? (
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <h3 className={`text-sm font-medium ${importStatus.success ? 'text-green-800' : 'text-red-800'}`}>
                  {importStatus.success ? 'Успешно' : 'Ошибка'}
                </h3>
                <div className={`mt-2 text-sm ${importStatus.success ? 'text-green-700' : 'text-red-700'}`}>
                  <p>{importStatus.message}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportExport;
