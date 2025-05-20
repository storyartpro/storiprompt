import pandas as pd
import json
import os

# Путь к Excel файлу
excel_file = '/home/ubuntu/upload/740 промтов для ChatGPT .xlsx'

# Чтение Excel файла
try:
    df = pd.read_excel(excel_file)
    print(f"Успешно прочитан файл Excel. Количество строк: {len(df)}")
    
    # Вывод названий столбцов для анализа структуры
    print("Столбцы в файле:")
    print(df.columns.tolist())
    
    # Вывод первых нескольких строк для анализа данных
    print("\nПервые 5 строк:")
    print(df.head(5))
    
    # Создаем структуру для хранения промптов
    prompts = []
    
    # Определяем соответствие столбцов Excel полям нашего каталога
    # Это нужно будет настроить после анализа структуры файла
    
    # Сохраняем результат в JSON файл для последующего импорта в React
    output_dir = '/home/ubuntu/storiprompt/client/src/data'
    os.makedirs(output_dir, exist_ok=True)
    
    # Пока сохраняем только информацию о структуре для дальнейшего анализа
    with open(f'{output_dir}/excel_structure.json', 'w', encoding='utf-8') as f:
        json.dump({
            'columns': df.columns.tolist(),
            'rows_count': len(df)
        }, f, ensure_ascii=False, indent=2)
    
    print(f"Информация о структуре сохранена в {output_dir}/excel_structure.json")
    
except Exception as e:
    print(f"Ошибка при чтении файла Excel: {e}")
