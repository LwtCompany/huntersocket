var express = require('express');
var socket = require('socket.io');

const PORT = process.env.PORT || 4000;
// App Setup
var app = express();
var server = app.listen(PORT,function(){
    console.log('lisitening to port 4000');
});


//static file

app.use(express.static('public'));


//Socket setup

var io = socket(server);

io.on('connection',function(socket){
    console.log('made socket connection',socket.id);

    socket.on('chat',function(data){ 
        io.sockets.emit('chat',data);
    });

    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data)
    });
}); 