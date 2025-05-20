import pandas as pd
import json
import os
import re

# Путь к Excel файлу
excel_file = '/home/ubuntu/upload/740 промтов для ChatGPT .xlsx'

# Функция для определения категории на основе текста промпта
def determine_category(prompt_text):
    prompt_text = prompt_text.lower()
    
    categories = {
        'Соцсети': ['соцсет', 'инстаграм', 'фейсбук', 'вконтакте', 'тикток', 'контент', 'пост'],
        'Бизнес': ['бизнес', 'продаж', 'маркетинг', 'клиент', 'компани', 'предприятие', 'стартап'],
        'Обучение': ['обучени', 'образовани', 'курс', 'урок', 'студент', 'ученик', 'преподаватель'],
        'Креатив': ['креатив', 'творчеств', 'идея', 'вдохновени', 'создани', 'придумай'],
        'Анализ': ['анализ', 'исследовани', 'данные', 'статистик', 'изучи', 'оцени'],
        'Редактирование': ['редактир', 'правк', 'текст', 'исправ', 'улучши', 'перепиши'],
        'Программирование': ['код', 'программ', 'разработ', 'алгоритм', 'функци', 'скрипт'],
        'Личное развитие': ['саморазвити', 'личностный рост', 'привычк', 'мотивац', 'цель']
    }
    
    for category, keywords in categories.items():
        for keyword in keywords:
            if keyword in prompt_text:
                return category
    
    return 'Другое'

# Функция для извлечения тегов из текста промпта
def extract_tags(prompt_text):
    # Список ключевых слов для извлечения тегов
    common_words = ['как', 'для', 'что', 'мне', 'тебя', 'это', 'мой', 'твой', 'наш', 'ваш', 'и', 'в', 'на', 'с', 'по', 'к', 'о', 'от']
    
    # Очистка текста и разбиение на слова
    words = re.findall(r'\b\w+\b', prompt_text.lower())
    
    # Фильтрация слов (убираем короткие и общие слова)
    filtered_words = [word for word in words if len(word) > 3 and word not in common_words]
    
    # Выбираем до 5 наиболее релевантных слов для тегов
    tags = list(set(filtered_words))[:5]
    
    return tags

try:
    # Чтение Excel файла
    df = pd.read_excel(excel_file)
    print(f"Успешно прочитан файл Excel. Количество строк: {len(df)}")
    
    # Пропускаем первую строку, так как она содержит заголовки "Русский" и "Английский"
    df = df.iloc[1:]
    
    # Переименовываем столбцы для удобства
    df.columns = ['prompt_ru', 'prompt_en']
    
    # Создаем структуру для хранения промптов
    prompts = []
    
    # Обрабатываем каждую строку
    for index, row in df.iterrows():
        # Пропускаем строки, где нет русского промпта
        if pd.isna(row['prompt_ru']) or not row['prompt_ru'].strip():
            continue
        
        prompt_text = row['prompt_ru']
        
        # Определяем категорию на основе текста
        category = determine_category(prompt_text)
        
        # Извлекаем теги
        tags = extract_tags(prompt_text)
        
        # Создаем объект промпта
        prompt = {
            'id': len(prompts) + 1,
            'title': prompt_text[:50] + ('...' if len(prompt_text) > 50 else ''),
            'promptText': prompt_text,
            'description': f'Промпт для ChatGPT на русском языке' + (f' с английским вариантом' if not pd.isna(row['prompt_en']) else ''),
            'category': category,
            'tags': tags,
            'status': 'готов',
            'author': 'Импорт из Excel'
        }
        
        # Добавляем английский вариант, если он есть
        if not pd.isna(row['prompt_en']):
            prompt['promptTextEn'] = row['prompt_en']
        
        prompts.append(prompt)
    
    print(f"Обработано промптов: {len(prompts)}")
    
    # Сохраняем результат в JSON файл для последующего импорта в React
    output_dir = '/home/ubuntu/storiprompt/client/src/data'
    os.makedirs(output_dir, exist_ok=True)
    
    with open(f'{output_dir}/imported_prompts.json', 'w', encoding='utf-8') as f:
        json.dump(prompts, f, ensure_ascii=False, indent=2)
    
    print(f"Промпты сохранены в {output_dir}/imported_prompts.json")
    
    # Создаем статистику по категориям
    category_stats = {}
    for prompt in prompts:
        category = prompt['category']
        if category in category_stats:
            category_stats[category] += 1
        else:
            category_stats[category] = 1
    
    print("\nСтатистика по категориям:")
    for category, count in category_stats.items():
        print(f"{category}: {count} промптов")
    
except Exception as e:
    print(f"Ошибка при обработке файла Excel: {e}")
