import React from 'react';

const AdminSidebar = ({ activeSection, setActiveSection, onLogout }) => {
  const menuItems = [
    { id: 'content', label: 'Управление контентом', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { id: 'design', label: 'Настройки дизайна', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' },
    { id: 'import-export', label: 'Импорт/Экспорт', icon: 'M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4' },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white">
      <div className="p-4">
        <h2 className="text-xl font-semibold">Админ-панель</h2>
        <p className="text-gray-400 text-sm">StoriPrompt</p>
      </div>
      
      <nav className="mt-5">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="mb-2">
              <button
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center w-full px-4 py-2 text-left ${
                  activeSection === item.id
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={item.icon}
                  />
                </svg>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 w-64 p-4">
        <button
          onClick={onLogout}
          className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-700 rounded"
        >
          <svg
            className="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Выйти
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
