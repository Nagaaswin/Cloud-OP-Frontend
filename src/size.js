const form = document.querySelector('#folderDetails');
const stopChecking = document.querySelector('#stopCheckSize');
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
    destination: '/app/checkSizeMsg',
    body: JSON.stringify({
      from: 'Check Size',
      message: 'Check for size status',
    }),
  });
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
    checkRequest();
  } else {
    processAlreadyRunning();
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
