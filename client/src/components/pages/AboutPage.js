import React from 'react';

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">О проекте СториPromt</h1>
        <p className="text-xl text-gray-600 mb-6">
          Платформа для обучения и совершенствования навыков промт-инжиниринга
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Цель проекта</h2>
        <p className="text-gray-700 mb-4">
          СториPromt создан для того, чтобы помочь пользователям освоить и улучшить навыки промт-инжиниринга через практику, 
          шаблоны и управление личной библиотекой промптов. Наша цель — сделать взаимодействие с искусственным интеллектом 
          более эффективным и продуктивным.
        </p>
        <p className="text-gray-700">
          Мы верим, что умение правильно формулировать запросы к AI — это ключевой навык современного специалиста, 
          который позволяет максимально использовать возможности искусственного интеллекта для решения различных задач.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Как использовать платформу</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-primary-600">31 день промт-упражнений</h3>
            <p className="text-gray-700">
              Ежедневные упражнения помогут вам систематически развивать навыки промт-инжиниринга. 
              Отслеживайте свой прогресс, оценивайте результаты и ведите рефлексию для постоянного улучшения.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-primary-600">Каталог промптов</h3>
            <p className="text-gray-700">
              Используйте готовые промпты из каталога или создавайте свои. Организуйте их по категориям и тегам 
              для быстрого доступа и эффективного использования.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-primary-600">Шаблоны и инструкции</h3>
            <p className="text-gray-700">
              Изучайте готовые шаблоны промптов для различных задач. Понимание структуры эффективных промптов 
              поможет вам создавать свои собственные.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-primary-600">Шаблонизатор</h3>
            <p className="text-gray-700">
              Создавайте промпты по структуре, заполняя поля: роль, контекст, задача, формат, ограничения и пример. 
              Система автоматически сгенерирует готовый промпт, который можно скопировать или экспортировать.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Автор проекта</h2>
        <p className="text-gray-700 mb-4">
          Проект СториPromt разработан командой энтузиастов промт-инжиниринга, которые верят в потенциал 
          искусственного интеллекта и стремятся сделать его использование более доступным и эффективным для всех.
        </p>
        <p className="text-gray-700">
          Мы постоянно работаем над улучшением платформы и будем рады вашим отзывам и предложениям.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Контакты и ресурсы</h2>
        <div className="space-y-2">
          <p className="text-gray-700">
            <span className="font-medium">Email:</span> info@storiprompt.ru
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Telegram:</span> @storiprompt
          </p>
          <p className="text-gray-700">
            <span className="font-medium">GitHub:</span> github.com/storiprompt
          </p>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Полезные ресурсы:</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li><a href="#" className="text-primary-600 hover:text-primary-800">Блог о промт-инжиниринге</a></li>
            <li><a href="#" className="text-primary-600 hover:text-primary-800">Сообщество в Telegram</a></li>
            <li><a href="#" className="text-primary-600 hover:text-primary-800">Видеоуроки на YouTube</a></li>
            <li><a href="#" className="text-primary-600 hover:text-primary-800">Книга "Основы промт-инжиниринга"</a></li>
          </ul>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} СториPromt. Все права защищены. Лицензия: MIT
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
