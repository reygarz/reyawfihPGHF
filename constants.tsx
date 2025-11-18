import React from 'react';
import { SlideData } from './types';

// Icons as SVG components for portability
export const Icons = {
  HTML: (props: any) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 18h8"/><path d="M4 18h8"/><path d="M8 14l-4-4 4-4"/><path d="M16 10l4 4-4 4"/></svg>
  ),
  CSS: (props: any) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
  ),
  JS: (props: any) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18l6-6-6-6"/><path d="M8 6l-6 6 6 6"/></svg>
  ),
  Excel: (props: any) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
  ),
  Design: (props: any) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
  ),
  Home: (props: any) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  ),
  Logo: (props: any) => (
    <svg {...props} viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10 40 L25 10 L40 40" className="logo-path-1" />
      <path d="M10 20 L40 20" className="logo-path-2" />
      <circle cx="25" cy="25" r="20" className="logo-circle" strokeOpacity="0.5" />
    </svg>
  )
};

export const SLIDES: SlideData[] = [
  {
    id: 'html',
    title: 'Структура HTML5',
    icon: <Icons.HTML className="w-8 h-8 text-orange-500" />,
    description: 'Семантический каркас веб-страниц.',
    points: [
      'Семантические теги: <header>, <nav>, <main>, <article>',
      'Атрибуты доступности (ARIA)',
      'Формы и их валидация',
      'Встраивание аудио и видео',
      'Лучшие практики SEO'
    ],
    codeSnippet: `<article>
  <header>
    <h2>Семантический Веб</h2>
  </header>
  <p>Контент статьи...</p>
</article>`,
    quiz: [
      {
        id: 1,
        text: 'Какой тег используется для основного контента?',
        options: ['<div>', '<main>', '<section>', '<content>'],
        correctIndex: 1
      },
      {
        id: 2,
        text: 'Что означает аббревиатура SEO?',
        options: ['Search Engine Optimization', 'Style Engine Order', 'Script Element Object', 'Нет верного'],
        correctIndex: 0
      },
      {
        id: 3,
        text: 'Какой атрибут описывает изображение для скринридеров?',
        options: ['src', 'title', 'alt', 'description'],
        correctIndex: 2
      }
    ]
  },
  {
    id: 'css',
    title: 'Современный CSS',
    icon: <Icons.CSS className="w-8 h-8 text-blue-500" />,
    description: 'Стилизация: Flexbox, Grid и переменные.',
    points: [
      'CSS переменные (Custom Properties)',
      'Модуль Flexbox Layout',
      'CSS Grid Layout',
      'Адаптивный дизайн (@media)',
      'Трансформации и анимации'
    ],
    codeSnippet: `:root {
  --primary: #3b82f6;
}
.card {
  display: flex;
  gap: 1rem;
  background: var(--primary);
}`,
    quiz: [
      {
        id: 1,
        text: 'Какое свойство меняет цвет текста?',
        options: ['font-color', 'text-color', 'color', 'background'],
        correctIndex: 2
      },
      {
        id: 2,
        text: 'Какое значение flex-direction не существует?',
        options: ['row', 'column', 'row-reverse', 'diagonal'],
        correctIndex: 3
      },
      {
        id: 3,
        text: 'Какая единица измерения зависит от шрифта корневого элемента?',
        options: ['em', 'rem', 'px', '%'],
        correctIndex: 1
      }
    ]
  },
  {
    id: 'js',
    title: 'JavaScript ES6+',
    icon: <Icons.JS className="w-8 h-8 text-yellow-400" />,
    description: 'Динамическая интерактивность и логика.',
    points: [
      'Стрелочные функции (Arrow Functions)',
      'Деструктуризация объектов и массивов',
      'Промисы (Promises) и Async/Await',
      'Манипуляции с DOM',
      'Обработчики событий (Event Listeners)'
    ],
    codeSnippet: `const fetchData = async () => {
  const res = await fetch('/api');
  const data = await res.json();
  console.log(data);
};`,
    quiz: [
      {
        id: 1,
        text: 'Какое слово объявляет неизменяемую переменную?',
        options: ['var', 'let', 'const', 'static'],
        correctIndex: 2
      },
      {
        id: 2,
        text: 'Какой результат операции 2 + "2"?',
        options: ['4', '"22"', 'NaN', 'Ошибка'],
        correctIndex: 1
      },
      {
        id: 3,
        text: 'Как записывается стрелочная функция?',
        options: ['function() {}', '() => {}', '=> {}', 'func =>'],
        correctIndex: 1
      }
    ]
  },
  {
    id: 'excel',
    title: 'Excel и Данные',
    icon: <Icons.Excel className="w-8 h-8 text-green-500" />,
    description: 'Анализ данных и логика таблиц.',
    points: [
      'Функции ВПР (VLOOKUP) и XLOOKUP',
      'Сводные таблицы (Pivot Tables)',
      'Условное форматирование',
      'Проверка данных (Data Validation)',
      'Основы макросов (VBA)'
    ],
    codeSnippet: `=IF(C2>60, "Pass", "Fail")
=VLOOKUP(A2, Table1, 3, FALSE)`,
    quiz: [
      {
        id: 1,
        text: 'Какая функция ищет значение в таблице?',
        options: ['SEARCH', 'FIND', 'VLOOKUP', 'LOCATE'],
        correctIndex: 2
      },
      {
        id: 2,
        text: 'С какого символа начинается формула?',
        options: ['#', '=', '$', '!'],
        correctIndex: 1
      },
      {
        id: 3,
        text: 'Какой инструмент суммирует большие наборы данных?',
        options: ['Графики', 'Сводная таблица', 'Сортировка', 'Фильтр'],
        correctIndex: 1
      }
    ]
  },
  {
    id: 'ux',
    title: 'Дизайн и UX',
    icon: <Icons.Design className="w-8 h-8 text-purple-500" />,
    description: 'Создание интуитивного опыта.',
    points: [
      'Иерархия и контраст',
      'Теория цвета',
      'Правила типографики',
      'Пользовательское тестирование',
      'Доступность (WCAG)'
    ],
    codeSnippet: `/* Принцип дизайна: 
   Коэф. контраста > 4.5:1 
   для обычного текста */`,
    quiz: [
      {
        id: 1,
        text: 'Как расшифровывается UX?',
        options: ['User Example', 'User Experience', 'Ultra Xylophone', 'User Exception'],
        correctIndex: 1
      },
      {
        id: 2,
        text: 'Какой цвет обычно обозначает ошибку?',
        options: ['Зеленый', 'Синий', 'Красный', 'Белый'],
        correctIndex: 2
      },
      {
        id: 3,
        text: 'Что такое "whitespace"?',
        options: ['Пустое пространство', 'Белый текст', 'Фон', 'Только отступы'],
        correctIndex: 0
      }
    ]
  }
];