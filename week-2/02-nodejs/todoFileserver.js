const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

//To find the ID whether it is present or not
function findIndex(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) return i;
  }
  return -1;
}
//to remove todo list of specific index
function removeIndex(arr, index) {
  let newarr = [];
  for (let i = 0; i < arr.length; i++) {
    if (index !== i) {
      newarr.push(arr[i]);
    }
  }
  return newarr;
}

//to get all the to do list in the file
app.get("/todos", (req, res) => {
  fs.readFile("file.json", "utf-8", (err, data) => {
    if (err) {
      res.status(404).json("File not Found");
      throw err;
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// to get a specific to do list
app.get("/todos/:id", (req, res) => {
  fs.readFile("file.json", "utf-8", (err, data) => {
    if (err) {
      res.status(404).json("File not Found");
    } else {
      const todos = JSON.parse(data);
      const todoIndex = findIndex(todos, parseInt(req.params.id));

      if (todoIndex === -1) {
        res.status(400).json("Wrong ID");
      } else {
        res.send(todos[todoIndex]);
      }
    }
  });
});

//To add new todos
app.post("/todos/", (req, res) => {
  const newtodo = {
    id: Math.floor(Math.random() * 1000000),
    title: req.body.title,
    description: req.body.description,
  };
  fs.readFile("file.json", "utf-8", (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    todos.push(newtodo);
    fs.writeFile("file.json", JSON.stringify(todos), (err) => {
      if (err) throw err;
      res.status(200).json("New Todos are added");
    });
  });
});

//to update todo list
app.put("/todos/:id", (req, res) => {
  fs.readFile("file.json", "utf-8", (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    const todoIndex = findIndex(todos, parseInt(req.params.id));
    if (todoIndex === -1) {
      res.status(404).json("ID Not Found");
    } else {
      const updatedTodo = {
        id: todos[todoIndex].id,
        title: req.body.title,
        description: req.body.description,
      };
      todos[todoIndex] = updatedTodo;
      fs.writeFile("file.json", JSON.stringify(todos), (err) => {
        if (err) throw err;
        res.status(200).json("Updated the Todo List");
      });
    }
  });
});

//to delete a todo ID
app.delete("/todos/:id", (req, res) => {
  fs.readFile("file.json", "utf-8", (err, data) => {
    if (err) throw err;
    let todos = JSON.parse(data);
    const todoIndex = findIndex(todos, parseInt(req.params.id));
    if (todoIndex === -1) {
      res.status(404).json("ID not found");
    } else {
      todos = removeIndex(todos, todoIndex);
      fs.writeFile("file.json", JSON.stringify(todos), (err) => {
        if (err) throw err;
        res.status(200).send("Deleted the TodoList");
      });
    }
  });
});

app.use((req, res, next) => {
  res.status(404).json("Wrong URL");
});

app.listen(3000, () => {
  console.log("Listening");
});
