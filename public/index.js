socket = new io.Socket('localhost');
socket.connect();
socket.on('message', function(data){
    alert('got some data' + data);
});
