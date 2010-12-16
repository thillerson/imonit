require.paths.unshift('../vendor/mongoose');
var mongoose = require('mongoose').Mongoose;
var db = mongoose.connect('mongodb://localhost/imonit');

TaskGroup = require('./taskGroup.js').TaskGroup(db);
