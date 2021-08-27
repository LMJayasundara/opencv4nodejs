const cv = require('/opncvnode/node_modules/opencv4nodejs')

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

const FPS = 10;
const cap = new cv.VideoCapture(0);

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index.html');
});

setInterval(() => {
    const input_frame = cap.read();
    const image = cv.imencode('.jpg', input_frame).toString('base64');
  
    io.emit('image', image);
  
}, 1000 / FPS);

server.listen(port, function(){
    console.log('listening on *:' + port);
})