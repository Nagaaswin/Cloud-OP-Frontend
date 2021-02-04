const description = document.querySelector('p:last-of-type');
const form = document.querySelector('#copyDetails');
const stopCopy = document.querySelector('#stopCopy');
let repeatingDescreption = description;
import { url } from './common.js';
import { websocket } from './common.js';
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
    destination: '/app/copyMsg',
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
      if (
        repeatingDescreption.innerHTML != 'Currently, No Process is Running.'
      ) {
        description.insertAdjacentHTML(
          'afterend',
          '<p>Currently, No Process is Running.</p>'
        );
        messageLog();
      }
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

axios.get(`${url}/setUpRclone`);
setInterval(sendMessage, 10000);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (flag) {
    copyRequest();
  } else {
    if (
      repeatingDescreption.innerHTML !=
      'Process is already running,Cannot send new Request.'
    ) {
      description.insertAdjacentHTML(
        'afterend',
        '<p>Process is already running,Cannot send new Request.</p>'
      );
      messageLog();
    }
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

function messageLog() {
  repeatingDescreption = document.querySelector('p:last-of-type');
}
