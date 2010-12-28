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

function updateTaskList(tasks) {
  $("#task-list").empty();
  $.each (tasks, function(index, taskJson) {
    var task = JSON.parse(taskJson);
    var taskImage = (task.complete) ? "checked.gif" : "unchecked.png";
    var imgHTML = "<img src='/images/" + taskImage + "'>";
    var taskToggleLink = "<a href='/tasks/" + task._id + "/toggle_complete?_method=put'>" + imgHTML + "</a>";
    $("#task-list").append("<li>" + taskToggleLink + task['name'] + "</li>");
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
      var bookId = message['taskBookId'];
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
