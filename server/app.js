var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    swig = require('swig');

// pass a secret to cookieParser() for signed cookies
app.use(express.cookieParser('rajineatnaigyan'));

// add req.session cookie support
app.use(express.cookieSession());

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use('/socket.io', express.static(__dirname + '/assets/socket.io'));
app.use('/assets', express.static(__dirname + '/assets'));

var ip = '127.0.0.1';
var port = '8000';


app.get('/', function (req, res, next) {
    res.locals.listen = 'http://' + ip + ':' + port;
    next();
}, function (req, res, next) {
    res.render('index');
});
app.get('/controller', function (req, res, next) {
    next();
}, function (req, res, next) {
    res.render('controller');
});

io.sockets.on('connection', function (socket) {
    var count = 0;
    socket.on('keydown', function (data) {
        socket.broadcast.emit('keydown',data);
    });
    socket.on('keyup', function (data) {
        socket.broadcast.emit('keyup',data);
    });
    
});
app.use(express.static(__dirname + '/FullScreenMario'));
server.listen(port);