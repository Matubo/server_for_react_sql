import sqlReturn from "./sqlReturnProdList";

const mysql = require("mysql");
const config = {
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "products_base",
};
const connection = mysql.createConnection(config); //интерфейс подключенияS
connection.query("SET SESSION wait_timeout = 604800");
function setData(data, callback) {
  //запрос к sql в теле начальный ид и калбек
  let timeNow = new Date();
  let sqlDate =
    timeNow.getFullYear() +
    "-" +
    timeNow.getMonth() +
    "-" +
    timeNow.getDate() +
    " " +
    timeNow.getHours() +
    ":" +
    timeNow.getMinutes() +
    ":" +
    timeNow.getSeconds();
  console.log(data);
  let json = JSON.parse(data);
  console.log(json);
  let name = json["name"];
  let number = json["number"];
  let order_data = json["order_data"]; //выводим основную информацию по заказу из полученного обьекта
  let order_text = order_data_pars(order_data["order"]);
  let order_total = order_data["price_sum"];
  connection.query(
    `INSERT INTO orders (name,tel,time,ordertext,total)  VALUES ('${name}','${number}','${sqlDate}','${order_text}','${order_total}')`, //отбираем 6 элементов из sql
    function (err, result) {
      console.log(err);
      callback("Done"); //возвращаем донэ в калбек
    }
  );
}

function sqlSave(data, callback) {
  setData(data, callback); //передает стартовый ид/промис в запрос, пока не нужный мне модуль, возможно вообще ненужный
}

function order_data_pars(data) {
  let sorted_data = [];
  for (let i = 0; i < data.length; i++) {
    sorted_data.push(
      `${data[i]["name"]} ${data[i]["price"]}руб./шт -  ${data[i]["count"]}шт.`
    );
  }
  return sorted_data;
}

export default sqlSave;
