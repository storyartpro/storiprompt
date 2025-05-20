# Структура проекта "СториPromt"

## Структура компонентов React

### Общие компоненты
- `App.js` - Основной компонент приложения
- `Layout.js` - Компонент для общего макета страниц
- `Navbar.js` - Компонент навигации
- `Footer.js` - Компонент подвала сайта
- `Sidebar.js` - Боковая панель навигации (для десктопной версии)
- `MobileMenu.js` - Мобильное меню (для адаптивной версии)

### Компоненты UI
- `Button.js` - Кнопка с различными вариантами стилей
- `Card.js` - Карточка для отображения информации
- `Table.js` - Таблица с возможностью сортировки и фильтрации
- `Modal.js` - Модальное окно
- `Tabs.js` - Компонент вкладок
- `Alert.js` - Компонент для уведомлений
- `Badge.js` - Бейдж для отображения статусов
- `Dropdown.js` - Выпадающий список
- `TextArea.js` - Многострочное текстовое поле
- `TextField.js` - Однострочное текстовое поле
- `Select.js` - Компонент выбора из списка
- `Checkbox.js` - Компонент чекбокса
- `RadioButton.js` - Компонент радиокнопки
- `Pagination.js` - Компонент пагинации

### Страницы
- `HomePage.js` - Главная страница
- `ExercisesPage.js` - Страница "31 день промт-упражнений"
- `CatalogPage.js` - Страница "Каталог промптов"
- `TemplatesPage.js` - Страница "Шаблоны и инструкции"
- `TemplateBuilderPage.js` - Страница "Шаблонизатор"
- `AboutPage.js` - Страница "О проекте"

### Компоненты для страницы "31 день промт-упражнений"
- `ExerciseTable.js` - Таблица упражнений
- `ExerciseRow.js` - Строка таблицы упражнений
- `ExerciseDetails.js` - Детали упражнения
- `ExerciseForm.js` - Форма для редактирования упражнения
- `ExerciseStats.js` - Статистика по упражнениям
- `ExerciseFilters.js` - Фильтры для упражнений
- `NextExerciseButton.js` - Кнопка "Следующее упражнение дня"

### Компоненты для страницы "Каталог промптов"
- `PromptTable.js` - Таблица промптов
- `PromptRow.js` - Строка таблицы промптов
- `PromptDetails.js` - Детали промпта
- `PromptForm.js` - Форма для добавления/редактирования промпта
- `PromptFilters.js` - Фильтры для промптов
- `PromptSearch.js` - Поиск по промптам
- `CopyPromptButton.js` - Кнопка "Скопировать промпт"

### Компоненты для страницы "Шаблоны и инструкции"
- `TemplateList.js` - Список шаблонов
- `TemplateCard.js` - Карточка шаблона
- `TemplateDetails.js` - Детали шаблона
- `TemplateForm.js` - Форма для редактирования шаблона
- `TemplateFilters.js` - Фильтры для шаблонов

### Компоненты для страницы "Шаблонизатор"
- `TemplateBuilder.js` - Основной компонент шаблонизатора
- `RoleSelector.js` - Выбор роли
- `ContextInput.js` - Ввод контекста
- `TaskInput.js` - Ввод задачи
- `FormatSelector.js` - Выбор формата
- `ConstraintsInput.js` - Ввод ограничений
- `ExampleInput.js` - Ввод примера
- `GeneratedPrompt.js` - Сгенерированный промпт
- `ExportToPdfButton.js` - Кнопка экспорта в PDF

## Структура навигации

### Основное меню
- Главная
- 31 день промт-упражнений
- Каталог промптов
- Шаблоны и инструкции
- Шаблонизатор
- О проекте

### Мобильное меню
- Гамбургер-меню с теми же пунктами, что и в основном меню

## Схема базы данных

### Таблица `exercises`
- `id` (Primary Key)
- `title` - Название упражнения
- `description` - Описание задания
- `status` - Статус выполнения (начато / сделано / упаковано)
- `time_spent` - Затраченное время (мин)
- `rating` - Оценка (1-5)
- `reflection` - Рефлексия
- `notes` - Личные заметки
- `day` - День (1-31)
- `created_at` - Дата создания
- `updated_at` - Дата обновления

### Таблица `prompts`
- `id` (Primary Key)
- `title` - Название промпта
- `prompt_text` - Текст промпта
- `description` - Описание задачи
- `category_id` - ID категории (Foreign Key)
- `status` - Статус (тест / готов / в работе)
- `author` - Автор
- `created_at` - Дата создания
- `updated_at` - Дата обновления

### Таблица `categories`
- `id` (Primary Key)
- `name` - Название категории
- `description` - Описание категории

### Таблица `tags`
- `id` (Primary Key)
- `name` - Название тега

### Таблица `prompt_tags` (связь многие-ко-многим)
- `prompt_id` (Foreign Key)
- `tag_id` (Foreign Key)

### Таблица `templates`
- `id` (Primary Key)
- `title` - Название шаблона
- `when_to_use` - Когда использовать
- `template_text` - Текст шаблона
- `example` - Пример
- `category_id` - ID категории (Foreign Key)
- `created_at` - Дата создания
- `updated_at` - Дата обновления

## API эндпоинты

### Упражнения
- `GET /api/exercises` - Получить список всех упражнений
- `GET /api/exercises/:id` - Получить упражнение по ID
- `POST /api/exercises` - Создать новое упражнение
- `PUT /api/exercises/:id` - Обновить упражнение
- `DELETE /api/exercises/:id` - Удалить упражнение
- `GET /api/exercises/stats` - Получить статистику по упражнениям

### Промпты
- `GET /api/prompts` - Получить список всех промптов
- `GET /api/prompts/:id` - Получить промпт по ID
- `POST /api/prompts` - Создать новый промпт
- `PUT /api/prompts/:id` - Обновить промпт
- `DELETE /api/prompts/:id` - Удалить промпт
- `GET /api/prompts/search` - Поиск промптов по ключевым словам

### Категории
- `GET /api/categories` - Получить список всех категорий
- `GET /api/categories/:id` - Получить категорию по ID
- `POST /api/categories` - Создать новую категорию
- `PUT /api/categories/:id` - Обновить категорию
- `DELETE /api/categories/:id` - Удалить категорию

### Теги
- `GET /api/tags` - Получить список всех тегов
- `GET /api/tags/:id` - Получить тег по ID
- `POST /api/tags` - Создать новый тег
- `PUT /api/tags/:id` - Обновить тег
- `DELETE /api/tags/:id` - Удалить тег

### Шаблоны
- `GET /api/templates` - Получить список всех шаблонов
- `GET /api/templates/:id` - Получить шаблон по ID
- `POST /api/templates` - Создать новый шаблон
- `PUT /api/templates/:id` - Обновить шаблон
- `DELETE /api/templates/:id` - Удалить шаблон

### Экспорт
- `GET /api/export/exercises/csv` - Экспорт упражнений в CSV
- `GET /api/export/exercises/json` - Экспорт упражнений в JSON
- `GET /api/export/prompts/csv` - Экспорт промптов в CSV
- `GET /api/export/prompts/json` - Экспорт промптов в JSON
- `GET /api/export/templates/pdf` - Экспорт шаблона в PDF
