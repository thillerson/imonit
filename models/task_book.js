require.paths.unshift('vendor/mongoose');
var mongoose = require('mongoose').Mongoose;

mongoose.model('TaskBook', {
  properties: ['name', {tasks:[['name', 'complete']]}],

  indexes: ['name']
});

exports.TaskBook = function(db) {
  return db.model('TaskBook');
}
