import React, { useState, useEffect } from 'react';

const ContentManager = () => {
  const [activeTab, setActiveTab] = useState('prompts');
  const [prompts, setPrompts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  
  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll use mock data from localStorage or defaults
    const storedPrompts = localStorage.getItem('prompts');
    const storedCategories = localStorage.getItem('categories');
    const storedTags = localStorage.getItem('tags');
    
    setPrompts(storedPrompts ? JSON.parse(storedPrompts) : [
      { id: 1, title: 'Пример промпта 1', content: 'Содержание промпта 1', category: 'Категория 1', tags: ['тег1', 'тег2'] },
      { id: 2, title: 'Пример промпта 2', content: 'Содержание промпта 2', category: 'Категория 2', tags: ['тег2', 'тег3'] }
    ]);
    
    setCategories(storedCategories ? JSON.parse(storedCategories) : [
      { id: 1, name: 'Категория 1', description: 'Описание категории 1' },
      { id: 2, name: 'Категория 2', description: 'Описание категории 2' }
    ]);
    
    setTags(storedTags ? JSON.parse(storedTags) : [
      { id: 1, name: 'тег1' },
      { id: 2, name: 'тег2' },
      { id: 3, name: 'тег3' }
    ]);
  }, []);
  
  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('prompts', JSON.stringify(prompts));
  }, [prompts]);
  
  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);
  
  useEffect(() => {
    localStorage.setItem('tags', JSON.stringify(tags));
  }, [tags]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleTagsChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      tags: value.split(',').map(tag => tag.trim())
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (activeTab === 'prompts') {
      if (editingItem) {
        setPrompts(prompts.map(item => 
          item.id === editingItem.id ? { ...formData, id: item.id } : item
        ));
      } else {
        setPrompts([...prompts, { ...formData, id: Date.now() }]);
      }
    } else if (activeTab === 'categories') {
      if (editingItem) {
        setCategories(categories.map(item => 
          item.id === editingItem.id ? { ...formData, id: item.id } : item
        ));
      } else {
        setCategories([...categories, { ...formData, id: Date.now() }]);
      }
    } else if (activeTab === 'tags') {
      if (editingItem) {
        setTags(tags.map(item => 
          item.id === editingItem.id ? { ...formData, id: item.id } : item
        ));
      } else {
        setTags([...tags, { ...formData, id: Date.now() }]);
      }
    }
    
    resetForm();
  };
  
  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({ ...item });
  };
  
  const handleDelete = (id) => {
    if (activeTab === 'prompts') {
      setPrompts(prompts.filter(item => item.id !== id));
    } else if (activeTab === 'categories') {
      setCategories(categories.filter(item => item.id !== id));
    } else if (activeTab === 'tags') {
      setTags(tags.filter(item => item.id !== id));
    }
  };
  
  const resetForm = () => {
    setEditingItem(null);
    setFormData({});
  };
  
  const renderForm = () => {
    if (activeTab === 'prompts') {
      return (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Заголовок</label>
            <input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Содержание</label>
            <textarea
              name="content"
              value={formData.content || ''}
              onChange={handleInputChange}
              rows="4"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Категория</label>
            <select
              name="category"
              value={formData.category || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Выберите категорию</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Теги (через запятую)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags ? formData.tags.join(', ') : ''}
              onChange={handleTagsChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex space-x-2">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {editingItem ? 'Обновить' : 'Добавить'}
            </button>
            
            {editingItem && (
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Отмена
              </button>
            )}
          </div>
        </form>
      );
    } else if (activeTab === 'categories') {
      return (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Название</label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Описание</label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
              rows="3"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          
          <div className="flex space-x-2">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {editingItem ? 'Обновить' : 'Добавить'}
            </button>
            
            {editingItem && (
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Отмена
              </button>
            )}
          </div>
        </form>
      );
    } else if (activeTab === 'tags') {
      return (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Название</label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div className="flex space-x-2">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {editingItem ? 'Обновить' : 'Добавить'}
            </button>
            
            {editingItem && (
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Отмена
              </button>
            )}
          </div>
        </form>
      );
    }
  };
  
  const renderList = () => {
    if (activeTab === 'prompts') {
      return (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900">Список промптов</h3>
          <div className="mt-2 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Заголовок</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Категория</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Теги</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {prompts.map(prompt => (
                  <tr key={prompt.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{prompt.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prompt.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {prompt.tags && prompt.tags.join(', ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(prompt)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Редактировать
                      </button>
                      <button
                        onClick={() => handleDelete(prompt.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else if (activeTab === 'categories') {
      return (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900">Список категорий</h3>
          <div className="mt-2 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Название</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Описание</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map(category => (
                  <tr key={category.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(category)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Редактировать
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else if (activeTab === 'tags') {
      return (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900">Список тегов</h3>
          <div className="mt-2 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Название</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tags.map(tag => (
                  <tr key={tag.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tag.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(tag)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Редактировать
                      </button>
                      <button
                        onClick={() => handleDelete(tag.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  };
  
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`${
              activeTab === 'prompts'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('prompts')}
          >
            Промпты
          </button>
          <button
            className={`${
              activeTab === 'categories'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('categories')}
          >
            Категории
          </button>
          <button
            className={`${
              activeTab === 'tags'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('tags')}
          >
            Теги
          </button>
        </nav>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900">
          {activeTab === 'prompts' && 'Добавить/редактировать промпт'}
          {activeTab === 'categories' && 'Добавить/редактировать категорию'}
          {activeTab === 'tags' && 'Добавить/редактировать тег'}
        </h3>
        <div className="mt-2">
          {renderForm()}
        </div>
      </div>
      
      {renderList()}
    </div>
  );
};

export default ContentManager;
