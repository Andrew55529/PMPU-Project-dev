# Инструкция по старту backend сервера

## Установка пакетов

Нужные пакеты возьмутся автоматически из package.json:

### `npm install`

## Запуск сервера

Нужные пакеты возьмутся автоматически из package.json:

### `npm run start`




# Для запуска сервера необходимо задать параметры в .env файл

* PORT=5000  - Порт сервера
* DB_HOST=127.0.0.1  - IP Базы данных
* DB_PORT=3307
* DB_USER=root
* DB_PASS=rootpassm
* DB_NAME=database
* JWT_ACCESS_SECRET=jwt - Код для проверки токена
* JWT_REFRESH_TIME=7 - Время жизни токена
* SNMP_HOST=smtp.gmail.com - Адрес почтового сервера
* SNMP_PORT=587 - Порт почтового сервера
* SNMP_USER=mail@gmail.com - Логин почтового сервера
* SNMP_PASSWORD=password - Пароль почтового сервера
* API_URL=http://127.0.0.1:5000 - Адрес сервера
* CLIENT_URL=http://127.0.0.1:3000  - Адрес Frontend сервера