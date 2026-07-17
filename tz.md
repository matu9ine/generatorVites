# MASTER PROMPT: Production Whitepage Website Generator

## 1. Роль и главная задача

Ты работаешь как senior full-stack architect, senior frontend developer, backend developer, UX/UI designer, QA engineer и DevOps engineer внутри существующего проекта генератора сайтов.

В репозитории уже есть частичные наработки. Твоя задача — не создавать отдельный демонстрационный макет и не писать только описание архитектуры, а:

1. Проанализировать текущий код.
2. Сохранить всё работающее.
3. Исправить архитектурные и функциональные проблемы.
4. Реализовать недостающий функционал.
5. Довести проект до полностью рабочего production-ready состояния.
6. Проверить генерацию реального многостраничного сайта от начала до конца.
7. Не останавливаться на плане, мокапе, статичной форме или частичной реализации.

Итогом должен стать полноценный SaaS-генератор сайтов, в котором пользователь за несколько шагов настраивает проект и получает готовый, функциональный, адаптивный, содержательный многостраничный сайт.

---

# 2. Ключевой принцип

Генератор не должен создавать:

* одну карточку с описанием будущего сайта;
* один hero-блок;
* пустой шаблон;
* страницу с Lorem Ipsum;
* набор файлов с минимальным содержимым;
* одинаковые сайты с заменёнными цветами;
* макет без работающих форм;
* интерфейс, который только изображает генерацию;
* ZIP-архив с пустыми страницами;
* страницы, не связанные между собой;
* дизайн, состоящий только из одинаковых квадратных карточек.

Генератор должен создавать настоящий полноценный сайт:

* с осмысленной информационной архитектурой;
* с профессиональным UX/UI;
* с адаптивной навигацией;
* с наполненными страницами;
* с оригинальным контентом;
* с работающими формами;
* с переходом на `thanks.php`;
* с корректными legal pages;
* с favicon, sitemap и robots;
* с подключаемой аналитикой;
* с внутренней перелинковкой;
* с SEO-метаданными;
* с корректной мобильной версией;
* с доступным интерфейсом;
* без ошибок в консоли;
* без неработающих ссылок;
* без незаполненных плейсхолдеров.

---

# 3. Работа с существующим проектом

Перед внесением изменений:

1. Просканируй весь репозиторий.
2. Определи текущий стек, структуру и архитектуру.
3. Найди уже реализованные:

   * темы;
   * категории сайтов;
   * формы;
   * генерацию файлов;
   * API;
   * компоненты интерфейса;
   * дизайн-пресеты;
   * настройки платформ;
   * экспорт ZIP;
   * деплой;
   * интеграции.
4. Не удаляй работоспособный функционал.
5. Не переписывай проект полностью без необходимости.
6. Исправляй и расширяй существующую архитектуру.
7. Устраняй дублирование.
8. Разделяй большие файлы на модули.
9. Не оставляй файлы на тысячи строк.
10. Не смешивай HTML, бизнес-логику, стили, API и конфигурацию в одном файле.

Сначала создай или обнови:

```text
IMPLEMENTATION_PLAN.md
ARCHITECTURE.md
README.md
```

После этого сразу переходи к реализации. Не останавливайся после написания документации.

Если текущий стек уже определён, используй его.

Если полноценного стека нет, используй:

```text
Frontend:
Vue 3
TypeScript
Vite
Pinia
Vue Router
PrimeVue

Backend:
Node.js
NestJS или модульный Express/Fastify
TypeScript

Storage:
PostgreSQL для проектов и настроек
Redis/BullMQ для очередей, если уже доступно
Локальное файловое хранилище с возможностью перейти на S3/MinIO

Testing:
Vitest
Playwright
ESLint
TypeScript strict mode
```

---

# 4. Что представляет собой продукт

Продукт — SaaS-интерфейс под названием:

```text
Whitepage Generator
```

Пользователь открывает генератор, создаёт проект, заполняет настройки и запускает генерацию.

Основной пользовательский сценарий:

```text
Создание проекта
→ Настройка контента
→ Выбор дизайна
→ Настройка аналитики
→ Генерация
→ Автоматическая проверка
→ Предпросмотр
→ Экспорт ZIP или деплой
```

Процесс должен быть понятен человеку без навыков программирования.

---

# 5. Интерфейс SaaS-генератора

Сделай полноценный dashboard с нормальным UX, а не одну длинную форму.

## Основная структура

```text
Sidebar
├── Dashboard
├── Projects
├── Create Website
├── Design Presets
├── Generated Websites
├── Deployments
├── Integrations
└── Settings
```

## Экран создания проекта

Используй пошаговый wizard/stepper.

### Шаг 1. Основные данные

Поля:

* название проекта;
* название сайта;
* домен;
* язык;
* locale;
* страна/гео;
* тематика сайта;
* подкатегория;
* описание бизнеса;
* целевая аудитория;
* основной CTA;
* тон коммуникации;
* формат сайта.

Тематики, которые уже находятся в проекте, должны остаться источником данных. Не удаляй их. Перенеси их в отдельную конфигурацию или базу данных, если сейчас они захардкожены в компонентах.

Добавь возможность:

* искать тематику;
* фильтровать тематики;
* создавать пользовательскую тематику;
* сохранять выбранную тематику в проекте.

---

### Шаг 2. Структура сайта

Настройки:

* количество услуг;
* количество статей;
* включить или выключить блог;
* включить FAQ;
* включить testimonials;
* включить кейсы;
* включить статистику;
* включить команду;
* включить карту;
* включить newsletter;
* включить дополнительную CTA-секцию;
* выбрать поля контактной формы.

Минимально обязательные страницы нельзя отключить.

---

### Шаг 3. Контактные и юридические данные

Поля:

* название компании или владельца;
* trading name;
* адрес;
* город;
* страна;
* почтовый индекс;
* email;
* телефон;
* часы работы;
* регистрационный номер компании;
* VAT/Tax number;
* responsible person;
* privacy contact email;
* email для получения заявок.

Не выдумывай регистрационные номера, лицензии, сертификаты, адреса или VAT.

Если данные не заполнены:

* не создавай ложные значения;
* либо не показывай необязательное поле;
* либо явно помечай его как требующее заполнения до публикации;
* не публикуй плейсхолдеры вроде `[Company Name]`.

---

### Шаг 4. Дизайн

Пользователь выбирает один из дизайн-пресетов.

Для каждого пресета показывай:

* название;
* превью;
* основные цвета;
* шрифтовое направление;
* тип подходящих тематик;
* краткое описание;
* варианты hero-блока;
* уровень визуальной выразительности.

Добавь фильтры:

* светлый;
* тёмный;
* корпоративный;
* editorial;
* технологичный;
* минималистичный;
* премиальный;
* яркий;
* спокойный;
* доступный;
* подходящий для услуг;
* подходящий для образования;
* подходящий для медиа;
* подходящий для техники.

Добавь live-preview в форматах:

* Desktop;
* Tablet;
* Mobile.

---

### Шаг 5. Рекламные и аналитические интеграции

Пользователь выбирает платформы:

```text
Google
Meta / Facebook
Google Tag Manager
Google Analytics
Google Search Console
```

Показывай дополнительные поля только для выбранной платформы.

#### Google

Поля:

* Google Tag ID;
* Google Ads Conversion ID;
* Google Ads Conversion Label;
* GA4 Measurement ID;
* GTM Container ID;
* Search Console verification meta;
* Search Console verification HTML filename;
* Search Console verification HTML content.

#### Meta / Facebook

Поля:

* Meta Pixel ID;
* стандартное событие конверсии;
* включение `PageView`;
* включение `Lead`;
* включение `CompleteRegistration`;
* custom event name.

#### Поведение интеграций

* основной аналитический код размещается на всех страницах;
* conversion event размещается на `thanks.php`;
* пользовательские IDs проходят валидацию;
* пустые IDs не создают пустые script-теги;
* маркетинговые скрипты учитывают cookie consent;
* для EU-гео необязательные marketing tags не запускаются до согласия пользователя;
* consent сохраняется в localStorage или cookie;
* пользователь может изменить согласие через footer link.

---

### Шаг 6. Генерация и результат

Показывай понятные этапы:

```text
Подготовка проекта
Генерация структуры
Генерация контента
Применение дизайн-системы
Создание страниц
Создание изображений/плейсхолдеров
Подключение аналитики
Создание sitemap.xml
Создание robots.txt
Проверка ссылок
Проверка форм
Проверка адаптивности
Финальная сборка
```

В результате должны быть доступны:

* Desktop preview;
* Mobile preview;
* список файлов;
* validation report;
* кнопка повторной генерации;
* кнопка редактирования проекта;
* кнопка скачивания ZIP;
* кнопка деплоя;
* ссылка на опубликованный сайт, если деплой настроен.

---

# 6. Единая модель проекта

Создай единую структуру `SiteProject` или `SiteSpec`.

Пример:

```ts
interface SiteProject {
  id: string;
  projectName: string;
  siteName: string;
  domain: string;

  locale: {
    language: string;
    country: string;
    localeCode: string;
    timezone?: string;
  };

  business: {
    topic: string;
    subtopic?: string;
    description: string;
    targetAudience: string;
    tone: string;
    primaryCta: string;
  };

  legal: {
    operatorName?: string;
    tradingName?: string;
    address?: string;
    city?: string;
    country?: string;
    postalCode?: string;
    email?: string;
    phone?: string;
    companyNumber?: string;
    vatNumber?: string;
    privacyEmail?: string;
  };

  structure: {
    servicesCount: number;
    articlesCount: number;
    enableBlog: boolean;
    enableFaq: boolean;
    enableTestimonials: boolean;
    enableCases: boolean;
    enableTeam: boolean;
    enableStats: boolean;
    enableNewsletter: boolean;
  };

  design: {
    presetId: string;
    customPrimaryColor?: string;
    customSecondaryColor?: string;
    customFont?: string;
  };

  integrations: {
    googleTagId?: string;
    googleAdsConversionId?: string;
    googleAdsConversionLabel?: string;
    ga4MeasurementId?: string;
    gtmContainerId?: string;
    searchConsoleMeta?: string;
    searchConsoleFileName?: string;
    searchConsoleFileContent?: string;
    metaPixelId?: string;
    metaConversionEvent?: string;
  };

  forms: {
    recipientEmail?: string;
    fields: string[];
    requireConsent: boolean;
  };

  generation: {
    status: string;
    createdAt: string;
    updatedAt: string;
    outputPath?: string;
  };
}
```

Эта модель должна быть единственным источником данных для:

* интерфейса;
* backend;
* генерации;
* предпросмотра;
* экспорта;
* деплоя;
* повторной генерации.

---

# 7. Структура генерируемого сайта

Каждый проект должен генерировать отдельную директорию.

Пример:

```text
generated-sites/
└── project-slug/
    ├── index.php
    ├── about.html
    ├── contact.html
    ├── service.html
    ├── services/
    │   ├── service-one.html
    │   ├── service-two.html
    │   └── service-three.html
    ├── articles/
    │   ├── index.html
    │   ├── article-one.html
    │   └── article-two.html
    ├── thanks.php
    ├── form-handler.php
    ├── privacy-policy.html
    ├── cookies-policy.html
    ├── terms-of-use.html
    ├── gdpr.html
    ├── sitemap.xml
    ├── robots.txt
    ├── favicon.svg
    ├── site.webmanifest
    ├── assets/
    │   ├── css/
    │   │   └── styles.css
    │   ├── js/
    │   │   └── script.js
    │   ├── img/
    │   ├── icons/
    │   └── fonts/
    └── generated-site.json
```

Использовать правильное имя:

```text
robots.txt
```

Не использовать ошибочное `robot.txt`.

---

# 8. Обязательные страницы и их содержание

## 8.1 `index.php`

Главная страница должна быть полноценной.

Минимальная структура:

1. Header.
2. Desktop navigation.
3. Mobile navigation.
4. Hero.
5. Краткое позиционирование.
6. Benefits или trust indicators.
7. Services preview.
8. Подробное описание подхода.
9. Process.
10. Key advantages.
11. Statistics или proof points, если включены.
12. Testimonials или cases, если включены.
13. FAQ.
14. Articles preview, если включён блог.
15. Contact CTA.
16. Footer.
17. Cookie banner.

Не используй одинаковый порядок секций для всех дизайн-пресетов.

Hero должен содержать:

* полноценный заголовок;
* supporting text;
* primary CTA;
* secondary CTA;
* визуальный элемент;
* корректный мобильный layout.

---

## 8.2 `about.html`

Страница должна включать:

* кто мы;
* чем занимается компания;
* миссия;
* подход;
* ценности;
* история или контекст проекта;
* рабочий процесс;
* преимущества;
* CTA;
* связь с другими страницами.

Не создавай выдуманные награды, годы опыта, сертификаты и членов команды, если эти данные не указаны.

---

## 8.3 `service.html`

Это не короткая карточка.

Страница должна включать:

* обзор услуг;
* навигацию по услугам;
* детальное описание;
* кому подходит;
* какую задачу решает;
* этапы оказания;
* преимущества;
* ожидаемый результат;
* FAQ;
* CTA.

Если выбрано несколько услуг, дополнительно создавай отдельные страницы:

```text
services/service-slug.html
```

На каждой отдельной странице услуги должен быть уникальный контент.

---

## 8.4 `contact.html`

Страница должна включать:

* контактные данные;
* часы работы;
* форму;
* пояснение по срокам ответа;
* privacy notice;
* согласие на обработку данных;
* ссылки на privacy policy;
* альтернативные способы связи;
* карту только при наличии реального адреса.

---

## 8.5 `thanks.php`

После успешной отправки формы пользователь должен перенаправляться на:

```text
thanks.php
```

Страница должна включать:

* подтверждение отправки;
* что произойдёт дальше;
* ориентир по ответу без ложных обещаний;
* кнопку возврата;
* ссылки на услуги;
* ссылки на полезные материалы;
* conversion events Google и Meta, если они настроены.

Не запускай conversion event при прямом случайном открытии страницы без контекста формы, если возможно технически сохранить состояние отправки.

---

## 8.6 Legal pages

Создать:

```text
privacy-policy.html
cookies-policy.html
terms-of-use.html
gdpr.html
```

Контент должен:

* соответствовать выбранному языку;
* использовать данные проекта;
* не содержать пустых шаблонов;
* не заявлять о несуществующих лицензиях;
* описывать реальные формы и трекеры;
* перечислять только фактически подключённые платформы;
* объяснять cookie consent;
* содержать контакт privacy operator;
* иметь дату последнего обновления;
* быть связанным ссылками с footer и контактной формой.

---

## 8.7 Статьи

Если пользователь выбрал статьи:

```text
articles/index.html
articles/article-slug.html
```

Каждая статья должна иметь:

* уникальный Title;
* Description;
* H1;
* introduction;
* подзаголовки;
* содержательный текст;
* практические выводы;
* FAQ или summary;
* внутренние ссылки;
* related articles;
* CTA;
* дату публикации;
* автора только при наличии реального или допустимого редакционного имени.

Не создавай десять почти одинаковых статей с заменой ключевых слов.

---

# 9. Навигация

Header navigation:

```text
Home
About
Services
Articles — только если включены
Contact
Primary CTA
```

Footer navigation:

```text
Home
About
Services
Articles
Contact
Privacy Policy
Cookies Policy
Terms of Use
GDPR
Cookie Settings
```

Требования:

* все ссылки должны работать;
* активный пункт должен визуально выделяться;
* мобильное меню должно открываться и закрываться;
* меню должно закрываться по Escape;
* меню должно закрываться после выбора пункта;
* фокус не должен теряться;
* логотип должен вести на главную;
* внутренние страницы должны иметь breadcrumbs;
* не использовать ссылки `href="#"`, если за ними нет действия;
* не использовать generic CTA без смысла.

---

# 10. Контент

## Требования к качеству

Контент должен:

* быть написан на выбранном языке;
* учитывать выбранное гео;
* звучать естественно;
* соответствовать тематике;
* быть уникальным между страницами;
* не повторять одинаковые абзацы;
* не содержать Lorem Ipsum;
* не содержать AI-плейсхолдеров;
* не содержать незаполненных квадратных скобок;
* не обещать гарантированный результат;
* не создавать ложные отзывы;
* не выдумывать партнёров;
* не выдумывать сертификаты;
* не выдумывать юридические реквизиты;
* не имитировать государственную организацию;
* не маскировать одну услугу под другую.

Ориентировочный объём:

```text
Homepage:
800–1600 слов суммарно по секциям

About:
600–1000 слов

Services overview:
700–1400 слов

Separate service:
500–1000 слов

Article:
900–1600 слов

Contact:
250–500 слов

Legal pages:
содержательно, без искусственного раздувания
```

Объём должен зависеть от тематики. Не наполняй страницы водой только ради количества слов.

---

# 11. Формы

Форма должна быть реально рабочей.

Минимальные поля:

* name;
* email;
* phone — опционально;
* message;
* privacy consent.

Функциональность:

1. Client-side validation.
2. Server-side validation.
3. Санитизация данных.
4. Проверка email.
5. Honeypot.
6. CSRF-защита, если архитектура позволяет.
7. Ограничение частоты отправки.
8. Понятные ошибки.
9. Состояние loading.
10. Защита от повторной отправки.
11. Отправка на email или настроенный endpoint.
12. Redirect на `thanks.php`.
13. Не хранить секреты в публичном JavaScript.
14. Не показывать PHP-ошибки пользователю.
15. Записывать технические ошибки в лог.

Если email transport не настроен, генератор должен:

* показать предупреждение;
* создать понятный конфигурационный файл;
* не притворяться, что письмо отправляется.

---

# 12. UX/UI требования

Создаваемые сайты должны выглядеть как настоящие современные сайты, а не шаблонные AI-лендинги.

Обязательные принципы:

* визуальная иерархия;
* разнообразие композиций;
* полноценная типографика;
* корректные размеры текста;
* выразительный hero;
* живые секции;
* чередование плотных и свободных участков;
* асимметрия там, где она уместна;
* качественные hover/focus states;
* аккуратные переходы;
* читаемые строки;
* нормальные отступы;
* логичная сетка;
* отсутствие бесконечной ленты одинаковых карточек;
* отсутствие чрезмерного glassmorphism;
* отсутствие случайных градиентов;
* отсутствие шаблонных blob-форм без смысла;
* отсутствие одинакового border-radius у каждого элемента;
* отсутствие чрезмерных теней;
* отсутствие анимаций, мешающих чтению.

Адаптивность:

```text
320px
375px
768px
1024px
1280px
1440px
1920px
```

Проверять:

* header;
* hero;
* forms;
* cards;
* tables;
* footer;
* cookie banner;
* mobile menu;
* длинные заголовки;
* длинные слова;
* изображения;
* legal pages.

---

# 13. Библиотека дизайн-пресетов

Создай директорию:

```text
design-presets/
```

В ней должны быть не пустые названия, а минимум 25 полноценных MD-файлов:

```text
01-editorial-classic.md
02-modern-saas.md
03-premium-corporate.md
04-swiss-minimal.md
05-warm-organic.md
06-tech-grid.md
07-neo-brutalist.md
08-luxury-dark.md
09-soft-pastel.md
10-urban-industrial.md
11-bold-magazine.md
12-calm-wellness.md
13-eco-natural.md
14-cinematic-story.md
15-monochrome-pro.md
16-mediterranean-warmth.md
17-nordic-light.md
18-retro-modern.md
19-playful-geometric.md
20-fintech-clean.md
21-education-friendly.md
22-craft-artisan.md
23-professional-services.md
24-futuristic-glass.md
25-high-contrast-accessible.md
```

Дополнительно создай:

```text
design-presets/index.json
design-presets/README.md
```

## Формат каждого MD-пресета

Используй YAML frontmatter:

```md
---
id: editorial-classic
name: Editorial Classic
category: editorial
mode: light
suitableFor:
  - education
  - media
  - consulting
  - writing
notRecommendedFor:
  - heavy-industry
primaryColor: "#..."
secondaryColor: "#..."
accentColor: "#..."
backgroundColor: "#..."
surfaceColor: "#..."
textColor: "#..."
mutedTextColor: "#..."
borderColor: "#..."
headingFont: "..."
bodyFont: "..."
radiusScale: "..."
shadowStyle: "..."
visualIntensity: 3
---
```

После frontmatter опиши:

1. Общую концепцию.
2. Подходящие тематики.
3. Неподходящие тематики.
4. Цветовую палитру.
5. Типографику.
6. Сетку.
7. Контейнеры.
8. Spacing system.
9. Border radius.
10. Borders.
11. Shadows.
12. Header.
13. Navigation.
14. Hero.
15. Buttons.
16. Cards.
17. Forms.
18. Service sections.
19. Article layout.
20. Footer.
21. Mobile behavior.
22. Imagery direction.
23. Icon style.
24. Animation rules.
25. Accessibility.
26. Что запрещено в этом стиле.
27. CSS variables.
28. Пример комбинации секций.

## Пример CSS-токенов

Каждый пресет должен содержать конкретные значения:

```css
:root {
  --color-primary: #000000;
  --color-secondary: #000000;
  --color-accent: #000000;
  --color-background: #ffffff;
  --color-surface: #ffffff;
  --color-text: #111111;
  --color-text-muted: #666666;
  --color-border: #dddddd;

  --font-heading: "...";
  --font-body: "...";

  --container-max: 1200px;
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 24px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
}
```

Не оставляй одинаковую палитру и одинаковые параметры во всех 25 файлах.

---

# 14. Работа дизайн-пресетов

Генератор должен не просто менять CSS variables.

Выбранный стиль должен влиять на:

* сетку;
* hero composition;
* header;
* форму карточек;
* плотность контента;
* фоновые секции;
* типографику;
* кнопки;
* иконки;
* изображения;
* иллюстрации;
* разделители;
* footer;
* формы;
* layout статей;
* анимации;
* порядок секций.

Создай движок:

```text
DesignPreset
→ DesignTokens
→ LayoutRules
→ ComponentVariants
→ Generated CSS
→ Generated templates
```

Для каждого проекта дизайн должен быть детерминированным: повторная генерация с теми же настройками не должна случайно полностью менять визуальный язык.

Добавь optional seed.

---

# 15. Генерация изображений и media assets

Если проект уже использует генерацию изображений, интегрируй её.

Если генерации нет, создай модульную абстракцию:

```ts
interface ImageProvider {
  generate(request: ImageGenerationRequest): Promise<GeneratedImage>;
}
```

Обязательные типы изображений:

* hero;
* service;
* article;
* about;
* optional background texture;
* logo placeholder или typographic logo.

Изображения должны:

* соответствовать тематике;
* соответствовать стилю;
* иметь разные композиции;
* иметь alt;
* быть оптимизированы;
* использовать WebP/AVIF с fallback при необходимости;
* иметь размеры;
* не вызывать layout shift;
* не содержать чужие логотипы;
* не изображать выдуманные награды;
* не использовать одно изображение во всех секциях.

Если внешний image provider не настроен, используй качественные локальные placeholders, соответствующие композиции, но не ломай сборку.

---

# 16. SEO

Для каждой страницы генерируй:

* уникальный `<title>`;
* уникальный meta description;
* canonical;
* Open Graph;
* Twitter Card;
* lang;
* hreflang, если есть языковые версии;
* H1;
* логичную иерархию H2/H3;
* semantic HTML;
* breadcrumbs;
* internal linking;
* alt;
* structured data при наличии достоверных данных.

Допустимые schema types:

* Organization;
* LocalBusiness — только при наличии реальных данных;
* Service;
* Article;
* BreadcrumbList;
* FAQPage — только если FAQ реально отображается.

Не добавляй фальшивые рейтинги или `AggregateRating`.

---

# 17. Sitemap и robots

Автоматически генерируй:

```text
sitemap.xml
robots.txt
```

`sitemap.xml` должен содержать только существующие публичные страницы.

Не включать:

* `form-handler.php`;
* технические JSON;
* preview pages;
* внутренние debug endpoints.

Пример `robots.txt`:

```text
User-agent: *
Allow: /

Disallow: /form-handler.php
Disallow: /generated-site.json

Sitemap: https://example.com/sitemap.xml
```

Домен должен подставляться из проекта.

---

# 18. Cookie consent

Создай работающий cookie banner:

* Accept all;
* Reject non-essential;
* Customize;
* Save preferences;
* link to Cookies Policy;
* возможность открыть настройки из footer.

Категории:

* Necessary;
* Analytics;
* Marketing.

Не загружай Google Ads, GA4 или Meta Pixel до согласия, когда consent обязателен для выбранного гео.

Не блокируй необходимые функциональные cookies.

---

# 19. Backend и API

Создай или доведи до конца API:

```text
GET    /api/design-presets
GET    /api/topics
GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
PATCH  /api/projects/:id
DELETE /api/projects/:id

POST   /api/projects/:id/generate
POST   /api/projects/:id/regenerate
POST   /api/projects/:id/validate
POST   /api/projects/:id/export
POST   /api/projects/:id/deploy

GET    /api/projects/:id/files
GET    /api/projects/:id/preview
GET    /api/jobs/:id
```

Генерация должна поддерживать состояния:

```text
DRAFT
QUEUED
GENERATING_STRUCTURE
GENERATING_CONTENT
GENERATING_ASSETS
RENDERING
VALIDATING
READY
FAILED
DEPLOYING
DEPLOYED
```

Ошибка одного этапа не должна уничтожать весь проект.

Добавь:

* retry;
* structured logs;
* error messages;
* progress percentage;
* сохранение результата;
* повторный запуск только упавшего этапа, если возможно.

---

# 20. Рендеринг сайта

Не собирай HTML через огромные строковые конкатенации.

Используй:

* Nunjucks;
* Handlebars;
* EJS;
* другой существующий template engine проекта.

Раздели шаблоны:

```text
templates/
├── layouts/
├── partials/
│   ├── header
│   ├── footer
│   ├── cookie-banner
│   ├── analytics
│   └── forms
├── pages/
├── sections/
├── legal/
└── components/
```

Добавь переиспользуемые компоненты:

* header;
* footer;
* hero;
* CTA;
* services;
* FAQ;
* testimonials;
* articles;
* contact form;
* breadcrumbs;
* cookie banner;
* mobile menu.

---

# 21. Экспорт

Кнопка Export ZIP должна:

1. Собрать только файлы текущего сайта.
2. Сохранить структуру директорий.
3. Проверить, что обязательные файлы существуют.
4. Создать архив.
5. Отдать архив пользователю.
6. Не включать:

   * `.env`;
   * credentials;
   * backend source;
   * database;
   * чужие проекты;
   * временные файлы;
   * логи с секретами.

---

# 22. Деплой

Если деплой уже существует, доведи его до рабочего состояния.

Поддерживаемые варианты:

* SFTP;
* SSH;
* FTP только при необходимости;
* local export.

Поля deployment target:

* host;
* port;
* username;
* password или private key;
* remote path;
* protocol.

Требования:

* credentials хранятся только на backend;
* secrets не попадают в generated site;
* тест соединения;
* progress;
* лог загруженных файлов;
* возможность повторного деплоя;
* backup существующей версии;
* rollback при критической ошибке;
* запрет выхода за разрешённую remote directory.

---

# 23. Безопасность

Обязательные требования:

* secrets только через `.env`;
* не логировать пароли;
* не возвращать credentials во frontend;
* path traversal protection;
* sanitization file names;
* validation domain;
* validation IDs;
* ограничения на загрузку файлов;
* CSRF для чувствительных операций;
* rate limiting;
* secure headers;
* escaping generated content;
* отсутствие `eval`;
* отсутствие небезопасного выполнения пользовательского кода.

---

# 24. Проверка генерируемого сайта

Создай автоматический `SiteValidator`.

Он должен проверять:

## Файлы

* все обязательные файлы существуют;
* CSS подключён;
* JS подключён;
* favicon существует;
* sitemap существует;
* robots существует.

## HTML

* есть `<html>`;
* есть `<head>`;
* есть `<title>`;
* есть description;
* есть H1;
* нет нескольких случайных H1;
* нет незакрытых тегов;
* нет Lorem Ipsum;
* нет `[PLACEHOLDER]`;
* нет `href="#"` без обработчика;
* нет пустых CTA;
* нет пустых alt у содержательных изображений.

## Ссылки

* внутренние ссылки ведут на существующие файлы;
* footer links работают;
* breadcrumbs работают;
* logo ведёт на главную;
* sitemap не содержит отсутствующие страницы.

## Формы

* action существует;
* method указан;
* required fields отмечены;
* privacy consent есть;
* redirect на thanks работает;
* ошибки отображаются.

## JavaScript

* нет console errors;
* mobile menu работает;
* cookie banner работает;
* modal и accordion работают;
* кнопки не вызывают ошибок.

## Responsive

Проверка Playwright:

```text
375x812
768x1024
1440x900
```

## Performance

* изображения не чрезмерно большие;
* нет тяжёлых неиспользуемых библиотек;
* lazy loading;
* width/height у изображений;
* отсутствие критического layout shift.

Validation report должен показываться в dashboard.

---

# 25. Тестирование

Добавь:

* unit tests для config parsing;
* unit tests для preset parser;
* unit tests для sitemap;
* unit tests для robots;
* unit tests для integration injection;
* integration tests API;
* tests ZIP export;
* tests project persistence;
* Playwright E2E;
* генерацию минимум двух тестовых сайтов с разными тематиками и стилями.

Тестовые проекты должны отличаться:

```text
Project A:
Education
English
Editorial Classic

Project B:
Technical Services
German
Urban Industrial
```

Проверь, что это не один и тот же HTML с заменённым текстом и цветом.

---

# 26. Критерии готовности

Проект считается завершённым только когда:

* dashboard работает;
* проект создаётся;
* проект сохраняется;
* список тематик работает;
* 25 дизайн-пресетов созданы;
* все пресеты содержательны;
* пресеты отображаются в интерфейсе;
* preview работает;
* генерация создаёт реальную папку сайта;
* обязательные страницы существуют;
* страницы наполнены;
* header и footer работают;
* мобильное меню работает;
* форма работает;
* redirect на thanks работает;
* legal pages заполнены;
* аналитика подключается условно;
* cookie consent управляет тегами;
* sitemap корректен;
* robots корректен;
* ZIP скачивается;
* validation report отображается;
* нет TypeScript errors;
* нет console errors;
* нет сломанных маршрутов;
* нет Lorem Ipsum;
* нет незаполненных плейсхолдеров;
* README содержит инструкцию запуска;
* `.env.example` заполнен названиями необходимых переменных;
* добавлены тесты;
* тестовая генерация успешно проходит.

---

# 27. Definition of Done для каждого сайта

Каждый сгенерированный сайт должен пройти следующий checklist:

```text
[ ] Полноценная главная страница
[ ] Страница About
[ ] Страница Contact
[ ] Страница Services
[ ] Отдельные страницы услуг при необходимости
[ ] Статьи при выбранном блоге
[ ] Privacy Policy
[ ] Cookies Policy
[ ] Terms of Use
[ ] GDPR
[ ] Thanks page
[ ] Рабочая форма
[ ] Рабочее мобильное меню
[ ] Рабочий cookie banner
[ ] Настроенные события аналитики
[ ] Sitemap
[ ] Robots
[ ] Favicon
[ ] SEO metadata
[ ] Open Graph
[ ] Breadcrumbs
[ ] Internal linking
[ ] Responsive layout
[ ] No console errors
[ ] No broken links
[ ] No placeholders
[ ] No fake company information
[ ] ZIP export
```

---

# 28. Правила реализации

1. Не спрашивай подтверждение после каждого шага.
2. Не останавливайся на анализе.
3. Не ограничивайся UI.
4. Не оставляй кнопки без реализации.
5. Не создавай mock API вместо реального API, если backend уже существует.
6. Не оставляй TODO вместо основной логики.
7. Не удаляй существующие тематики.
8. Не создавай 25 одинаковых MD-файлов.
9. Не храни секреты во frontend.
10. Не дублируй header/footer вручную в генераторе.
11. Не создавай неработающие ссылки.
12. Не создавай выдуманные реквизиты.
13. Не создавай скрытую подмену контента.
14. Не создавай разные версии сайта для модерации и реальных посетителей.
15. Сайт, реклама, тематика и содержание должны соответствовать друг другу.
16. После каждого крупного этапа запускай tests и build.
17. Исправляй найденные ошибки до завершения.
18. В конце предоставь фактический отчёт:

    * что найдено;
    * что изменено;
    * какие файлы созданы;
    * какие функции реализованы;
    * какие тесты пройдены;
    * какие ограничения остались.

---

# 29. Финальная команда

Начни с анализа текущего репозитория, затем создай план и сразу реализуй проект до рабочего состояния.

Не создавай отдельный учебный пример рядом с текущим приложением.

Работай непосредственно с существующим кодом.

Главный результат — пользователь открывает Whitepage Generator, выбирает параметры, нажимает Generate и получает настоящий многостраничный сайт, который можно:

* просмотреть;
* проверить;
* отредактировать через настройки;
* скачать ZIP-архивом;
* загрузить на домен.

Не завершай задачу, пока основной end-to-end сценарий не работает.
