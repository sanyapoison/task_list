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
source venv/bin/activate 
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 5000
```

### 3. Настройка и запуск фронтенда
```bash
cd ../frontend
npm install
npm run serve
```

### 4. Комментарии к проекту
```bash
запускается с теми командами что были в ридми, нужно было пару правок внести в cors и на фронте + пару правок сделал
запуск бэка и фронта из двух окон отдельно, не делал на продакшн
локально если хотите запустить
все методы api можно пощупать в swagger по адресу http://89.23.115.219:5000/docs
```
