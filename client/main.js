var socket = io.connect('http://8.12.0.147:8080', {'forceNow':true});

//Recibimos mensajes del servidor, alias 'messages'
socket.on('messages', function(data){
    console.log(data);
    render(data);
});

function render(data){
    var html = data.map(function(message, index){
        return(`
            <div class="message">
                <strong>
                    ${message.nick}
                </strong>
                <span>
                    <p>${message.text}</p>
                </span>
            </div>
        `);
    }).join(' ');

    var div_msgs = document.getElementById('dashboard');
    div_msgs.innerHTML = html;
    div_msgs.scrollTop = div_msgs.scrollHeight;
}

function addMessage(e){
    //Creamos un objeto a partir de los atributos
    var message = {
        nick: document.getElementById('nick').value,
        text: document.getElementById('text').value
    };

    //Escondemos el nickname
    document.getElementById('nick').style.display = 'none';
    // Emitimos el mensaje al servidor con el mensajes alias : add-message
    socket.emit('add-message', message);
    //limpiamos la caja de texto
    document.getElementById('text').value = '';
    return false;
}