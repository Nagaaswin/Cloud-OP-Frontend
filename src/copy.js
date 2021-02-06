const form = document.querySelector('#copyDetails');
const stopCopy = document.querySelector('#stopCopy');
let flag = false;
import {
  url,
  stompClientConnect,
  stompClient,
  onSocketClose,
  noProcessRunning,
  statusMessage,
  processAlreadyRunning,
} from './common.js';

stompClientConnect();

stompClient.onConnect = function (frame) {
  frameHandler(frame);
};
stompClient.onWebsocketClose = function () {
  onSocketClose();
};
stompClient.activate();

function sendMessage() {
  stompClient.publish({
    destination: '/app/copyMsg',
    body: JSON.stringify({
      from: 'Copy',
      message: 'Check for copy status',
    }),
  });
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
      noProcessRunning();
      return;
    }
  });
}

function showMessage(message) {
  const contents = message.content;
  for (const content of contents) {
    statusMessage(content);
  }
}

axios.get(`${url}/setUpRclone`);
setInterval(sendMessage, 10000);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (flag) {
    copyRequest();
  } else {
    processAlreadyRunning();
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
  } catch (err) {
    console.log(err);
  }
}
