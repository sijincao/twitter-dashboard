var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var twitter_route = require('./server/routes/twitter_route');

app.use(express.static('static'));
app.set('view engine', 'jade');
app.set('views', './static');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/static/index.html');
});

app.use(twitter_route);

http.listen(3000, function(){
    console.log('listening on *:3000');
});
