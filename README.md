# Todo App — FastAPI + Vue.js

Это проект Todo-приложения, построенного с использованием **FastAPI** на стороне бэкенда и **Vue.js** на стороне фронтенда. Проект поддерживает аутентификацию, управление задачами и отображение списка задач.

## Структура проекта

- **backend**: Серверная часть на FastAPI.
- **frontend**: Клиентская часть на Vue.js.

## Установка и запуск локально

### 1. Клонирование репозитория

```bash
git clone https://github.com/sanyapoison/task_list.git
cd task_list
```

### 2. Настройка и запуск бэкенда
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Для Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 5000
```

### 3. Настройка и запуск фронтенда
```bash
cd ../frontend
npm install
npm run serve
```