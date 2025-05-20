import pandas as pd
import json
import os

# Пути к файлам
excel_file_1 = '/home/ubuntu/upload/740 промтов для ChatGPT .xlsx'
excel_file_2 = '/home/ubuntu/upload/31_день_промт-инжиниринга_STORYART_с_каталогом.xlsx'
output_dir = '/home/ubuntu/storiprompt/client/src/data'
output_file = os.path.join(output_dir, 'imported_prompts.json')

# Создаем директорию, если она не существует
os.makedirs(output_dir, exist_ok=True)

# Функция для обработки первого файла
def process_file_1(file_path):
    try:
        # Чтение Excel файла
        df = pd.read_excel(file_path)
        
        # Вывод информации о структуре файла
        print(f"Файл 1: {file_path}")
        print(f"Количество строк: {len(df)}")
        print(f"Столбцы: {df.columns.tolist()}")
        print(f"Первые 5 строк:")
        print(df.head())
        
        # Преобразование в нужный формат
        prompts = []
        for index, row in df.iterrows():
            try:
                # Проверяем наличие необходимых столбцов
                title = str(row.get('Название', f'Промпт {index+1}'))
                if pd.isna(title) or title == 'nan':
                    title = f'Промпт {index+1}'
                
                prompt_text = str(row.get('Текст промпта', ''))
                if pd.isna(prompt_text) or prompt_text == 'nan':
                    prompt_text = ''
                
                category = str(row.get('Категория', 'Общее'))
                if pd.isna(category) or category == 'nan':
                    category = 'Общее'
                
                # Получаем теги, если есть
                tags = []
                if 'Теги' in df.columns:
                    tags_str = str(row.get('Теги', ''))
                    if not pd.isna(tags_str) and tags_str != 'nan':
                        tags = [tag.strip() for tag in tags_str.split(',') if tag.strip()]
                
                # Создаем объект промпта
                prompt = {
                    'id': index + 1,
                    'title': title,
                    'promptText': prompt_text,
                    'description': str(row.get('Описание', '')),
                    'category': category,
                    'tags': tags,
                    'status': 'готов',
                    'author': 'Импорт из файла 1'
                }
                
                prompts.append(prompt)
            except Exception as e:
                print(f"Ошибка при обработке строки {index} в файле 1: {e}")
        
        return prompts
    except Exception as e:
        print(f"Ошибка при обработке файла 1: {e}")
        return []

# Функция для обработки второго файла
def process_file_2(file_path):
    try:
        # Чтение Excel файла
        df = pd.read_excel(file_path)
        
        # Вывод информации о структуре файла
        print(f"\nФайл 2: {file_path}")
        print(f"Количество строк: {len(df)}")
        print(f"Столбцы: {df.columns.tolist()}")
        print(f"Первые 5 строк:")
        print(df.head())
        
        # Преобразование в нужный формат
        prompts = []
        for index, row in df.iterrows():
            try:
                # Проверяем наличие необходимых столбцов
                title = str(row.get('Название упражнения', f'Упражнение {index+1}'))
                if pd.isna(title) or title == 'nan':
                    title = f'Упражнение {index+1}'
                
                description = str(row.get('Описание', ''))
                if pd.isna(description) or description == 'nan':
                    description = ''
                
                # Создаем объект промпта/упражнения
                prompt = {
                    'id': 1000 + index,  # Начинаем с 1000, чтобы избежать конфликтов с первым файлом
                    'title': title,
                    'promptText': str(row.get('Промпт', '')),
                    'description': description,
                    'category': 'Упражнение',
                    'tags': ['упражнение', 'обучение', 'практика'],
                    'status': 'готов',
                    'author': 'Импорт из файла 2'
                }
                
                prompts.append(prompt)
            except Exception as e:
                print(f"Ошибка при обработке строки {index} в файле 2: {e}")
        
        return prompts
    except Exception as e:
        print(f"Ошибка при обработке файла 2: {e}")
        return []

# Обработка файлов
prompts_1 = process_file_1(excel_file_1)
prompts_2 = process_file_2(excel_file_2)

# Объединение результатов
all_prompts = prompts_1 + prompts_2

# Сохранение в JSON файл
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(all_prompts, f, ensure_ascii=False, indent=2)

print(f"\nИмпорт завершен. Всего импортировано промптов: {len(all_prompts)}")
print(f"Результат сохранен в {output_file}")
