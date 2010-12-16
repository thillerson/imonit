require.paths.unshift('vendor/mongoose');
var mongoose = require('mongoose').Mongoose;
require('./models/models.js');
var db = mongoose.connect('mongodb://localhost/imonit');

var express = require('express');
var jade = require('jade');

var app = express.createServer();

app.configure(function(){
  // app.use(app.router);
  app.use(express.bodyDecoder());
  app.use(express.methodOverride());
  app.use(express.logger());
  app.use(express.staticProvider(__dirname + '/public'));

  app.set("view engine", "jade");
  app.set("view options", { layout: false } )
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res) {
  var taskGroups = TaskGroup.find().all (function(taskGroups) {
    console.log('task groups' + taskGroups);
    res.render('index',{
      locals: {
        title: 'Task Groups',
        taskGroups: taskGroups
      }
    });
  });
})

app.post('/groups', function(req, res) {
  var groupParams = req.body.group;
  var taskGroup = new TaskGroup();
  taskGroup.name = groupParams['name'];
  taskGroup.save(function() {
    console.log('saved task group: ' + groupParams['name']);
  });
  res.redirect('/');
})

app.listen('3000');
