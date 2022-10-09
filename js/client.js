const socket = io('http://localhost:8000');

//Get DOM element in respective js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
var audio = new Audio('ting.mp3');

//Function which will append to container
const append = (message,position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left')
        audio.play();
}

//Ask user name and let server know
const naame = prompt("Enter your name to join");
socket.emit('new-user-joined',naame);

//if a new user joins, receive his/her name from server
socket.on('user-joined',name => {
    append(`${name} joined the chat`,'right')
})

//if a server sends a message, receive it
socket.on('receive',data => {
    append(`${data.name}: ${data.message}`,'left')
})

//If a user leave the chat, append the info to the container
socket.on('left',name => {
    append(`${name} left the chat!`,'left')
})

//If form get submitted, send server message
form.addEventListener('submit',(e)=> {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';
})
