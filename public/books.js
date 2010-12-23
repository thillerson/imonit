$.ajaxSetup({ 
  //beforeSend: function(xhr) {xhr.setRequestHeader("X-HTTP-Method-Override", method)},
  scriptCharset: "utf-8",
  dataType: "json",
  contentType: "application/json; charset=utf-8"
});

function currentBookId() {
  var components = document.location.pathname.split('/');
  var id = components[2];
  return id;
}

function updateTaskList(taskBook) {
  var tasks = taskBook.tasks;
  $("#task-list").empty();
  $.each (tasks, function(index, task) {
    $("#task-list").append("<li>" + task['name'] + "</li>");
  });
  $("#task-list").effect("highlight", {}, 1500);
}

$(document).ready(function() {
  var socket = jQuery.data(document.body, 'socket');
  socket.on('message', function(data){
    var message = JSON.parse(data);
    var messageType = message['type'];
    switch(messageType) {
    case "task-created" :
      var bookId = message['bookId'];
      if (bookId == currentBookId()) {
        $.ajax({ url: '/books/' + bookId + ".json",
                 success: function(data) {
                   updateTaskList(data);
                 }
               });
      }
    }
  });
});
