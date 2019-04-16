/*Роут GET /lists, который будет отдавать HTML страницу с формой создания списка.  + фронтовая задача
Роут GET /lists/${id}, который будет отдавать HTML страницу детального отображения списка.  +
Роут GET /api/lists/${id} отображения заметки со списком. забиваем0..
Роут POST /api/lists для добавления нового списка задач с учетом того, что количество позиций в списке - не ограничено и заранее не известно.
Роут PUT /api/lists/${id} для редактирования списка задач.
Роут DELETE /api/lists/${id} для удаления заметки со списком.
Юнит-тесты на свою часть приложения.*/



//надо отдавать статусы
//посмотреть, надо ли отдавать статусы

const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db.js');
const MongoClient = require('mongodb').MongoClient;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));




app.get('/api/lists/:id',(req,res)=>{
  res.send(`API LIST ID IS : ${req.params.id}`)
});


app.delete('/api/lists/:id',(req,res)=>{
  res.send(`ONE LIST WAS DELETED  ${req.params.id}`)
});


MongoClient.connect(db.url,{useNewUrlParser:true},(err, client)=>{


  console.log('We are connected!!');

  const database = client.db(db.name);
  const collection = database.collection('toDoList');

  require('./routes')(app,collection);


  app.listen(port, () => { // назначаем порт для прослушивания
    console.log('Connected to '+ db.url);
    console.log('We are live on http://localhost:3000');
  });
});




