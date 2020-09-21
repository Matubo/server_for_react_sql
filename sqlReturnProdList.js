const mysql = require("mysql");
const config = {
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "products_base",
};
const connection = mysql.createConnection(config); //интерфейс подключенияS
connection.query("SET SESSION wait_timeout = 604800");

function getData(startId, callback) {
  //запрос к sql в теле начальный ид и калбек
  connection.query(
    `SELECT * FROM products WHERE id > ${startId} LIMIT 9`, //отбираем до 6 элементов из sql
    function (err, result) {
      callback(result); //возвращаем дату в калбек
    }
  );
}

function sqlReturn(startId, callback) {
  getData(startId, callback); //передает стартовый ид/промис в запрос, пока не нужный мне модуль, возможно вообще ненужный
}

export default sqlReturn;
