var express = require('express')
var app = express()

//Cargamos la dependencia http de node 
var server = require('http').Server(app)

//Pasamos a socket.io
var io = require('socket.io')(server)
/*
var io = require('socket.io')(3000);

*/
//Definicion de middleware
app.use(express.static('client'))

app.use(function(req , res, next){
    //Puede ser consumida desde cualquier lugar
    res.header('Access-Control-Allow-Origin','*');
    //Cabeceras permitidas
    res.header('Access-Control-Allow-Headers','X-API-KEY,Origin,X-Requested-With,Content-Type,Accept,Access-Control-Request-Method');
    //Metodos Permitidos
    res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
    res.header('Allow','GET,POST,PUT,DELETE');
    next();
});

// Url del recurso
app.get('/public/chat/', function(req,res){
    res.status(200).send('Bienvenido al chat :D')
})

var messages=[{
    text: 'Bienvenido a la zona de chat',
    nick: 'Bot-Bienvenida'
}]

// Creamos evento de conexion
io.on('connection', function(socket){
    console.log("En nodo IP " + socket.handshake.address + "se ha conectado ...")
    //Evento de emision se recogera por los clientes
    socket.emit('messages', messages)

    // Recibimos los mensajes del cliente
    socket.on('add-message', function(data){
        //agrego el mensaje
        messages.push(data);
        //emitimos a todos los clientes
        io.sockets.emit('messages',messages);
    })

})
//Dejamos un escucha del servidor 
server.listen(8080, function(){
    console.log("Servidor escucha un puerto 8080")
})

