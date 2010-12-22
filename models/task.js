require.paths.unshift('vendor/mongoose');
var mongoose = require('mongoose').Mongoose;

mongoose.model('Task', {
  properties: ['name', 'complete'],

  cast: {
    complete: Boolean
  },

  indexes: ['name']
});

exports.Task = function(db) {
  return db.model('Task');
}
