const socket = io('http://localhost:3000');

const form = document.getElementById('message-form');
const input = document.getElementById('message-input');
const lsPrefix = 'whatsapp-app-';
let username = localStorage.getItem(lsPrefix + 'username');

const getUsername = () => {
  if (localStorage.getItem(lsPrefix + 'username')) {
    username = localStorage.getItem(lsPrefix + 'username', prompt('Enter your username'));
  }
}
getUsername();

form.addEventListener('submit', e => {
  e.preventDefault();
  if (input.value) {
    socket.emit('send message', input.value);
    input.value = '';
  }
})

socket.on('typing', msg => appendToMsgContainer(msg))

socket.on('user joined', username => {
  appendToMsgContainer(username + ' joined')
})

const msgContainer = document.getElementById('message-container');

socket.on('receive message', msg => {
  appendToMsgContainer(`${username}: ${msg}`)
})

const appendToMsgContainer = msg => {
  const li = document.createElement('li');
  li.textContent = msg;
  msgContainer.appendChild(li);
}