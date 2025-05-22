import React, { useState, useEffect } from 'react';
import CollapsibleMenu from '../common/CollapsibleMenu';

const CatalogSidebar = ({ categories, onCategorySelect }) => {
  // Group categories by section
  const sections = {
    'Основы промптинга': ['Основы промпт-инженерии', 'Структура и компоненты промптов'],
    'Техники промптинга': ['Техники Zero-shot и Few-shot', 'Цепочки рассуждений', 'Промпт-чейнинг'],
    'Применение': ['Генерация и использование примеров', 'Промпты для работы с кодом', 'Промпты для генерации текста'],
    'Специализированные': ['Промпты для бизнес-задач', 'Промпты для образования', 'Промпты для научных исследований']
  };

  return (
    <div className="w-64 bg-gray-50 p-4 border-r">
      <h2 className="text-xl font-semibold mb-4">Категории</h2>
      
      {Object.entries(sections).map(([sectionName, sectionCategories], index) => (
        <CollapsibleMenu 
          key={sectionName} 
          title={sectionName} 
          isFirstSection={index === 0}
        >
          <ul className="space-y-2">
            {sectionCategories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => onCategorySelect(category)}
                  className="w-full text-left px-2 py-1 hover:bg-gray-200 rounded"
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </CollapsibleMenu>
      ))}
    </div>
  );
};

export default CatalogSidebar;
