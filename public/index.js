$(document).ready(function() {
  var socket = jQuery.data(document.body, 'socket');
  socket.on('message', function(data){
    var message = JSON.parse(data);
    var messageType = message['type'];
    switch(messageType) {
    case "book-created" :
      var book = (message.book typeof Object) ? message['book'] : JSON.parse(message['book']);
      var bookId = book['_id'];
      var itemId = "li#" + bookId;
      
      $("#task-books-list").append("<li id='" + bookId + "'><a href='/books/" + bookId + "'>" + book['name'] + "</a></li>");
      $(itemId).effect(
        "highlight", {}, 3000
    );
    };
  });
});
