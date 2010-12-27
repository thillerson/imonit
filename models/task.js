require.paths.unshift('vendor/mongoose');
var mongoose = require('mongoose').Mongoose;
ObjectID = require('mongodb').ObjectID

mongoose.model('Task', {
  properties: ['name', 'complete', 'taskBookId'],

  cast: {
    taskBookId: ObjectID
  }
});

exports.Task = function(db) {
  return db.model('Task');
}
