require.paths.unshift('vendor/mongoose');
var mongoose = require('mongoose').Mongoose;

mongoose.model('TaskGroup', {
  properties: ['name'],

  indexes: ['name']
});

exports.TaskGroup = function(db) {
  return db.model('TaskGroup');
}
