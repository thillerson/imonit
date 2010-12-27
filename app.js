require.paths.unshift('vendor/mongoose');
require('./models/models.js');

var http = require('http');
var io = require('socket.io');
var mongoose = require('mongoose').Mongoose;
var db = mongoose.connect('mongodb://localhost/imonit');

var express = require('express');
var jade = require('jade');

var app = express.createServer();
var socket = io.listen(app)

app.configure(function(){
  app.use(express.bodyDecoder());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.staticProvider(__dirname + '/public'));
  app.use(express.logger());

  app.set("view engine", "jade");
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res) {
  var taskBooks = TaskBook.find().all (function(taskBooks) {
    res.render('index',{
      locals: {
        title: 'Task Books',
        taskBooks: taskBooks,
        extraScripts: ["index.js"]
      }
    });
  });
});

app.post('/books', function(req, res) {
  var bookParams = req.body.book;
  var taskBook = new TaskBook();
  taskBook.name = bookParams['name'];
  taskBook.save(function() {
    console.log('saved task book: ' + bookParams['name']);
    message = { type: "book-created", book: taskBook};
    socket.broadcast( JSON.stringify(message) );
  });
  res.redirect('/');
});

app.get('/books/:id.:format?', function(req, res) {
  TaskBook.findById(req.params.id, function(taskBook) {
    if (taskBook) {
      Task.find({taskBookId:new ObjectID(req.params.id)}).all(function(tasks) {
        if (req.params.format == "json") {
          res.send(taskBook, {'Content-Type':'application/json; charset=utf-8'}, 200 )
        } else {
          res.render('book',{
            locals: {
              title: 'Tasks for ' + taskBook.name,
              taskBook: taskBook,
              tasks: tasks,
              extraScripts: ["books.js"]
            }
          });
        }
      });
    } else {
      res.send('Not Found', 404);
    }
  });
});

app.post('/books/:id/tasks', function(req, res) {
  var taskParams = req.body.task;
  TaskBook.findById(req.params.id, function(taskBook) {
    if (taskBook) {
      task = new Task();
      task.name = taskParams['name'];
      task.complete = false;
      task.taskBookId = taskBook._id;
      task.save(function(){
        message = { type: "task-created", task: task};
        socket.broadcast( JSON.stringify(message) );
      });
      res.redirect('/books/' + taskBook._id.toHexString() );
    } else {
      res.send('Not Found', 404);
    }
  });
});

//FIXME: This should be a put, but the method override "?_method=put" doesn't seem to
//work...
app.get('/tasks/:id/toggle_complete', function(req, res) {
  Task.findById(req.params.id, function(task) {
    if (task) {
      task.complete = !task.complete
      task.save(function() {
        message = { type: "task-updated", task: task};
        socket.broadcast( JSON.stringify(message) );
      });
      res.redirect('/books/' + task.taskBookId.toHexString() );
    } else {
      res.send('Not Found', 404);
    }
  });
});

app.listen('3000');
