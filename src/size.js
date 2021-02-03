const description = document.querySelector('p:last-of-type');
const form = document.querySelector('#folderDetails');
const stopChecking = document.querySelector('#stopCheckSize');

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
      // sendMessage();
    } else {
      flag = true;
      description.insertAdjacentHTML(
        'afterend',
        '<p>Currently, No Process is Running.</p>'
      );
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

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (flag) {
    checkRequest();
  } else {
    description.insertAdjacentHTML(
      'afterend',
      '<p>Process is already running,Cannot send new Request.</p>'
    );
  }
});

async function checkRequest() {
  try {
    const fd = new FormData(form);
    axios.post(`${url}/checkSize`, fd);
    setInterval(sendMessage, 10000);
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
