var email = prompt('What is your email address?');

var ws = new WebSocket('ws://localhost:5000');
var messageList = document.querySelector('.messageList');
var newMessageForm = document.querySelector('.newMessageForm');

var renderMessage = function(message) {
    var li = document.createElement('li');
    li.textContent = message.email + ': ' + message.message;
    messageList.appendChild(li);

}

ws.addEventListener('message', function(event) {
    // console.log(event.data);
    var message = JSON.parse(event.data);
    renderMessage(message);
});

newMessageForm.addEventListener('submit', function(event) {
    event.preventDefault();
    var message = newMessageForm.content.value;
    ws.send(JSON.stringify({message: message, email: email}));
    newMessageForm.reset();
});