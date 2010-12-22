require.paths.unshift('../vendor/mongoose');
var mongoose = require('mongoose').Mongoose;
var db = mongoose.connect('mongodb://localhost/imonit');

TaskBook = require('./task_book.js').TaskBook(db);
Task = require('./task.js').Task(db);
