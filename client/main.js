const socket = io.connect('http://192.168.0.106:2715', { query: 'token=127jim@1', 'foceNew': true })

socket.on('messages', function (data) {
  // render(data);
})

function render (data) {
  var html = data.map(function (message, index) {
    return (`
              <div class="message">
                <strong>${message.transmitter} dice:</strong>
                <p>${message.message}</p>
              </div>
            `)
  }).join(' ')
  document.getElementById('messages').innerHTML = html
}

function addMessage (e) {
  var data = {
    idUser: document.getElementById('idUser').value,
    transmitter: document.getElementById('transmitter').value, // emisor
    receiver: document.getElementById('receiver').value, // receptor
    message: document.getElementById('message').value
  }
  socket.emit('add-message', data)
  return false
}
