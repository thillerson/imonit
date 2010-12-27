require.paths.unshift('../vendor/mongoose');
var mongoose = require('mongoose').Mongoose;
var db = mongoose.connect('mongodb://localhost/imonit');

Task = require('./task.js').Task(db);
TaskBook = require('./task_book.js').TaskBook(db);
