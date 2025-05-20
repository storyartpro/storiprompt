import pandas as pd
import json
import os

def process_excel_files():
    """
    Обрабатывает Excel-файлы с промптами и упражнениями, 
    преобразует их в JSON-формат для использования в приложении.
    """
    # Пути к файлам
    prompts_file = '/home/ubuntu/upload/740 промтов для ChatGPT .xlsx'
    exercises_file = '/home/ubuntu/upload/31_день_промт-инжиниринга_STORYART_с_каталогом.xlsx'
    
    # Директория для сохранения результатов
    data_dir = '/home/ubuntu/storiprompt/client/src/data'
    os.makedirs(data_dir, exist_ok=True)
    
    # Обработка файла с промптами
    process_prompts_file(prompts_file, data_dir)
    
    # Обработка файла с упражнениями
    process_exercises_file(exercises_file, data_dir)
    
    print("Импорт данных завершен успешно!")

def process_prompts_file(file_path, output_dir):
    """
    Обрабатывает файл с промптами и сохраняет результаты в JSON.
    """
    try:
        # Чтение Excel-файла
        df = pd.read_excel(file_path)
        
        # Преобразование данных в формат для каталога
        catalog_prompts = []
        
        for index, row in df.iterrows():
            # Извлечение данных из строки
            prompt_text = str(row.iloc[0]) if not pd.isna(row.iloc[0]) else ""
            
            # Определение категории и тегов
            category = "Общие"
            tags = []
            
            # Анализ текста промпта для определения категории и тегов
            lower_text = prompt_text.lower()
            
            if "маркетинг" in lower_text or "продажи" in lower_text or "реклама" in lower_text:
                category = "Маркетинг и продажи"
                tags.append("маркетинг")
            elif "код" in lower_text or "программирование" in lower_text or "разработка" in lower_text:
                category = "Программирование"
                tags.append("код")
            elif "текст" in lower_text or "статья" in lower_text or "пост" in lower_text:
                category = "Копирайтинг"
                tags.append("текст")
            elif "анализ" in lower_text or "данные" in lower_text or "исследование" in lower_text:
                category = "Аналитика"
                tags.append("анализ")
            elif "обучение" in lower_text or "образование" in lower_text or "учеба" in lower_text:
                category = "Образование"
                tags.append("обучение")
            
            # Создание объекта промпта
            prompt = {
                "id": index + 1,
                "title": f"Промпт #{index + 1}",
                "promptText": prompt_text,
                "description": prompt_text[:100] + "..." if len(prompt_text) > 100 else prompt_text,
                "category": category,
                "tags": tags,
                "status": "готов",
                "author": "Импортировано из Excel",
                "createdAt": "2025-05-20T00:00:00.000Z"
            }
            
            catalog_prompts.append(prompt)
        
        # Сохранение результатов в JSON-файл
        output_file = os.path.join(output_dir, 'catalog_prompts.json')
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(catalog_prompts, f, ensure_ascii=False, indent=2)
        
        print(f"Обработано {len(catalog_prompts)} промптов из файла {file_path}")
        
    except Exception as e:
        print(f"Ошибка при обработке файла с промптами: {e}")

def process_exercises_file(file_path, output_dir):
    """
    Обрабатывает файл с упражнениями и сохраняет результаты в JSON.
    """
    try:
        # Чтение Excel-файла
        df = pd.read_excel(file_path)
        
        # Преобразование данных в формат для упражнений
        exercises = []
        
        for index, row in df.iterrows():
            if index >= 31:  # Ограничиваем 31 днем
                break
                
            # Извлечение данных из строки (адаптируйте индексы в зависимости от структуры файла)
            try:
                title = str(row.iloc[0]) if not pd.isna(row.iloc[0]) else f"Упражнение {index + 1}"
                description = str(row.iloc[1]) if len(row) > 1 and not pd.isna(row.iloc[1]) else ""
                
                # Создание объекта упражнения
                exercise = {
                    "day": index + 1,
                    "date": f"{(index + 19) % 30 + 1:02d}.05.2025",  # Генерируем даты с 19 мая 2025
                    "title": title,
                    "description": description,
                    "status": "не начато",
                    "timeSpent": 0,
                    "notes": "",
                    "rating": 0,
                    "bonusPrompt": f"Бонус-промпт для дня {index + 1}: Используйте этот промпт для мгновенного повышения эффективности.",
                    "conclusion": f"Вывод дня {index + 1}: Практика этого упражнения помогает развить навыки структурирования запросов."
                }
                
                exercises.append(exercise)
            except Exception as e:
                print(f"Ошибка при обработке строки {index}: {e}")
        
        # Сохранение результатов в JSON-файл
        output_file = os.path.join(output_dir, 'exercises.json')
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(exercises, f, ensure_ascii=False, indent=2)
        
        print(f"Обработано {len(exercises)} упражнений из файла {file_path}")
        
    except Exception as e:
        print(f"Ошибка при обработке файла с упражнениями: {e}")

if __name__ == "__main__":
    process_excel_files()
