const description = document.querySelector('p:last-of-type');
const form = document.querySelector('#folderDetails');
import { url, websocket } from './common.js';
let stompClient = null;
let flag = false;


stompClient = new window.StompJs.Client({
  webSocketFactory: function () {
    return new WebSocket(websocket);
  },
});

stompClient.onConnect = function (frame) {
  frameHandler(frame);
};
stompClient.onWebsocketClose = function () {
  onSocketClose();
};

stompClient.activate();

function sendMessage() {
  stompClient.publish({
    destination: '/app/copy',
    body: JSON.stringify({
      from: 'Copy',
      message: 'Check for copy status',
    }),
  });
}

function onSocketClose() {
  if (stompClient !== null) {
    stompClient.deactivate();
  }
  console.log('Socket was closed. Setting connected to false!');
}

function frameHandler(frame) {
  console.log('Connected: ' + frame);
  sendMessage();
  stompClient.subscribe('/topic/copyMessages', function (message) {
    var msg = JSON.parse(message.body);
    if (msg.isalive == 'true') {
      flag = false;
      showMessage(msg);
      sendMessage();
    } else {
      flag = true;
      return;
    }
  });
}

function showMessage(message) {
  const contents = message.content;
  for (const content of contents) {
    description.insertAdjacentHTML('afterend', `<p>${content}</p>`);
  }
}

axios.get(`${url}/setUpCopy`);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (flag) {
    copyRequest();
  }
});

stopCopy.addEventListener('submit', (event) => {
  event.preventDefault();
  stopCopyHandler();
});

async function stopCopyHandler() {
  try {
    axios.get(`${url}/stopCopying`);
  } catch (err) {
    console.log(err);
  }
}

async function copyRequest() {
  try {
    const fd = new FormData(form);
    axios.post(`${url}/copy`, fd);
    setTimeout(sendMessage, 2000);
  } catch (err) {
    console.log(err);
  }
}
