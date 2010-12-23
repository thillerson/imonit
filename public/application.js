$(document).ready(function() {
  var socket = new io.Socket(document.location.hostname);
  socket.connect();
  jQuery.data(document.body, 'socket', socket);
})
