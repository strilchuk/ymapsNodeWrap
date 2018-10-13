# ymapsNodeWrap
API Карт под Node.js

Реализована node-обертка для API Карт с использованием библиотеки puppeteer, которая позволяет работать с JS API Карт без использования графического интерфейса браузера. Доступно создание контейнера docker.

Формат URL:
GET http://server_ip:8080/route?apikey=<secret_code>&waypoints=<coordinates_1|coordinates_2|...>, где
coordinates_n - координаты заданные географическимим координатами или точным адресом.
