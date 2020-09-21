import getSqlData from "./sqlReturnProdList"; //Вовзращает список товаров
import sendSqlData from "./sqlSaveOrder"; //Сохраняет заказ

const express = require("express"); //ну емана експресс
const cors = require("cors"); //хинт
const bodyParser = require("body-parser"); //парсер
const app = express();

app.use(cors()); //читерский хинт что бы не ругался cors policy
app.use(bodyParser.json()); //используем модуль для парса входящих данных

const port = 3005;

app.get("/", (req, res) => {
  res.send(`This isn't a site`);
});

app.use(express.static(__dirname + "/public"));

app.post("/GETSQLDATA", (req, res) => {
  console.log(req.body["id"]); //лог ид из боди запроса
  let promise = new Promise((res, rej) => {
    //промис отправляет полученные от скл данные
    getSqlData(req.body["id"], res); //получить данные со стартовым ид
  }).then((data) => {
    console.log(data);
    res.send(JSON.stringify(data)); //отправка переведенных в джсон данных обратно
  });
});

app.post("/SENDSQLDATA", (req, res) => {
  console.log(req.body["data"]);
  let promise = new Promise((res, rej) => {
    //промис отправляет полученные от скл данные из
    sendSqlData(req.body["data"], res);
  }).then((data) => {
    console.log(data);
    res.send(JSON.stringify(data));
  });
});

app.listen(port, () => {
  console.log(`port №${port}`);
});
