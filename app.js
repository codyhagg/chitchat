var express = require("express");
var app = express();
var port = 8080;
 
// app.get("/", function(req, res){
//     res.send("It works!");
// });
//this is for using jade
app.set('views', __dirname + '/public/templates');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("index");
});
// end jade bit

// inform ExpressJS where to look for the front-end logic
app.use(express.static(__dirname + '/public'));
// kick off
// app.listen(port);
var io = require('socket.io').listen(app.listen(port));
io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});
console.log("Listening on port " + port);