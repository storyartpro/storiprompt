# Инструкция по встраиванию приложения "СториPromt" в WordPress

## Способ 1: Использование HTML-блока в редакторе Gutenberg

1. Войдите в панель администратора WordPress
2. Создайте новую страницу или отредактируйте существующую
3. Добавьте новый блок, нажав на "+" в редакторе
4. Выберите блок "HTML" (Пользовательский HTML)
5. Вставьте следующий код:

```html
<div class="storiprompt-container" style="width: 100%; max-width: 1200px; margin: 0 auto; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <iframe 
        src="https://efzsxupm.manus.space" 
        style="width: 100%; height: 700px; border: none; overflow: hidden;" 
        title="СториPromt - Приложение для обучения промт-инжинирингу" 
        allow="clipboard-write"
        loading="lazy"
        scrolling="yes">
    </iframe>
</div>
```

6. Сохраните страницу и опубликуйте

## Способ 2: Использование шорткода (для продвинутых пользователей)

1. Добавьте следующий код в файл functions.php вашей темы:

```php
// Шорткод для встраивания СториPromt
function storiprompt_embed_shortcode($atts) {
    // Параметры по умолчанию
    $atts = shortcode_atts(
        array(
            'height' => '700',
            'width' => '100%',
            'maxwidth' => '1200px',
        ),
        $atts,
        'storiprompt'
    );
    
    // Формируем HTML-код
    $output = '<div class="storiprompt-container" style="width: ' . esc_attr($atts['width']) . '; max-width: ' . esc_attr($atts['maxwidth']) . '; margin: 0 auto; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">';
    $output .= '<iframe src="https://efzsxupm.manus.space" style="width: 100%; height: ' . esc_attr($atts['height']) . 'px; border: none; overflow: hidden;" title="СториPromt - Приложение для обучения промт-инжинирингу" allow="clipboard-write" loading="lazy" scrolling="yes"></iframe>';
    $output .= '</div>';
    
    return $output;
}
add_shortcode('storiprompt', 'storiprompt_embed_shortcode');
```

2. Используйте шорткод на любой странице или записи:

```
[storiprompt]
```

3. Вы можете настроить параметры:

```
[storiprompt height="600" maxwidth="1000px"]
```

## Способ 3: Использование виджета в сайдбаре или подвале

1. Перейдите в раздел "Внешний вид" > "Виджеты"
2. Добавьте виджет "HTML-код" в нужную область
3. Вставьте код iframe (как в Способе 1)
4. Сохраните изменения

## Способ 4: Использование плагина Page Builder

Если вы используете конструкторы страниц, такие как Elementor, Divi или WPBakery:

1. Добавьте элемент "HTML" или "Пользовательский код"
2. Вставьте код iframe (как в Способе 1)
3. Настройте стили и отображение через интерфейс конструктора

## Рекомендации по настройке

- **Высота iframe**: Стандартное значение 700px можно изменить в зависимости от вашего дизайна
- **Максимальная ширина**: По умолчанию 1200px, можно настроить под ваш шаблон
- **Мобильная адаптация**: При необходимости добавьте медиа-запросы для адаптивности на мобильных устройствах

## Решение возможных проблем

1. **Iframe не отображается**: Убедитесь, что ваша тема WordPress не блокирует iframe
2. **Проблемы с безопасностью**: Если возникают ошибки безопасности, проверьте настройки Content Security Policy вашего сайта
3. **Стили не применяются**: Некоторые темы могут переопределять стили iframe, добавьте префикс !important к CSS-свойствам

Для получения дополнительной помощи обратитесь к разработчику.
