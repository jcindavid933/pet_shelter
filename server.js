const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const path = require('path');
app.use(express.static( __dirname + '/public/dist/public' ));

require('./server/routes')(app);
const server = app.listen(8000, function() {
    console.log("listening on port 8000");
})

const io = require('socket.io')(server);

app.use(function(req, res, next) {
  req.io = io;
  next();
});
io.on('connection', function(socket) {
  socket.on('message', function(data){
    io.emit('message', data);
  })
  console.log('socket.io connection made');
});
