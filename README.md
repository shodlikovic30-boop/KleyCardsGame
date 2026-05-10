# KleyCardsGame

Демо-тёмный сайт с карточками аниме: hero, сетка, модальные окна, поиск, избранное (localStorage) и адаптивность.

Как запустить локально:

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/shodlikovic30-boop/KleyCardsGame.git
   cd KleyCardsGame
   ```
2. Откройте локальный сервер (например):
   ```bash
   python3 -m http.server 8000
   # или
   # npx http-server .
   ```
3. Откройте http://localhost:8000 в браузере.

Что добавлено в этом коммите:
- index.html — главная страница
- assets/js/main.js — клиентская логика
- assets/css/styles.css — стили (уже в репозитории)
- assets/img/* — SVG-заглушки для обложек

Дальше могу:
- заменить SVG-заглушки реальными обложками (если пришлёте изображения)
- подключить backend (Node.js / FastAPI) для пользователей, избранного, рейтингов и комментариев
- добавить пагинацию, фильтрацию по категориям, Telegram OAuth и т.д.
