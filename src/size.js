const description = document.querySelector('p:last-of-type');
const form = document.querySelector('#folderDetails');
const stopChecking = document.querySelector('#stopCheckSize');
let repeatingDescreption = description;

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
    destination: '/app/checkSizeMsg',
    body: JSON.stringify({
      from: 'Check Size',
      message: 'Check for size status',
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
  stompClient.subscribe('/topic/checkSizeMessages', function (message) {
    var msg = JSON.parse(message.body);
    if (msg.isalive == 'true') {
      flag = false;
      showMessage(msg);
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
    if (repeatingDescreption.innerHTML != 'Size checking is already Running.') {
      description.insertAdjacentHTML('afterend', `<p>${content}</p>`);
      messageLog();
    }
  }
}

axios.get(`${url}/setUpRclone`);

setInterval(sendMessage, 10000);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (flag) {
    checkRequest();
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

async function checkRequest() {
  try {
    const fd = new FormData(form);
    axios.post(`${url}/checkSize`, fd);
  } catch (err) {
    console.log(err);
  }
}

stopChecking.addEventListener('submit', (event) => {
  event.preventDefault();
  stopCheckSizeHandler();
});

async function stopCheckSizeHandler() {
  try {
    axios.get(`${url}/stopCheckingSize`);
  } catch (err) {
    console.log(err);
  }
}

function messageLog() {
  repeatingDescreption = document.querySelector('p:last-of-type');
}
