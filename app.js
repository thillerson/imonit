require.paths.unshift('vendor/mongoose');
var mongoose = require('mongoose').Mongoose;
var app = require('express').createServer();

app.get('/', function(req,res) {
  res.send('Hello nerd');
})

app.listen(3000);
