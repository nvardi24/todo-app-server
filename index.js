require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app =  express();
let todos = require("./todos.json");
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

let key = 3;
app.post('/create', async (req,res) => {
  const data = req.body;
    if(data.todo !== ''){
    key = key+1;
    todos.push({...data, id: key })
    res.send({msg:'OK', todos: todos});
    }else{
        res.send({msg: 'Todo must not be empty!'})
    }
});

app.get('/get', async (req,res) => {
    const data = req.body;
    res.send({ todos: todos});
});

app.delete('/delete', async (req,res) => {
    const data = req.body;
    const index = todos.findIndex((todo)=>todo.id === data.id);
    todos.splice(index,1);
    res.send({ msg: 'Todo deleted', todos: todos});
});

app.patch('/update', async (req,res) => {
    const data = req.body
    const index = todos.findIndex((todo)=>todo.id === data.id);
    todos.splice(index,1,data);
    res.send({ msg: 'Todo updated', todos: todos});
});

app.patch('/mark-all', async (req,res) => {
  todos.forEach((todo)=>{
    todo.completed = true;
  });
  res.send({ msg: 'Todos updated', todos: todos});
});

app.listen(4000, ()=>console.log("Up and running on port 4000 :)"));