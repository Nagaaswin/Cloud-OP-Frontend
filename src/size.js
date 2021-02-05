let description = document.querySelector('p:last-of-type');
const form = document.querySelector('#folderDetails');
const stopChecking = document.querySelector('#stopCheckSize');
const descriptionSection = document.querySelector('#description');
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
      if (description.innerHTML != 'Currently, No Process is Running.') {
        let newEl = document.createElement('p');
        newEl.innerHTML = 'Currently, No Process is Running.';
        insertAfter(newEl, description);
        scrollDown();
      }
      return;
    }
  });
}

function showMessage(message) {
  const contents = message.content;
  for (const content of contents) {
    if (
      description.innerHTML != 'Size checking is already Running.' ||
      content != 'Size checking is already Running.'
    ) {
      let newEl = document.createElement('p');
      newEl.innerHTML = `${content}`;
      insertAfter(newEl, description);
      scrollDown();
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
      description.innerHTML !=
      'Process is already running,Cannot send new Request.'
    ) {
      let newEl = document.createElement('p');
      newEl.innerHTML = 'Process is already running,Cannot send new Request.';
      insertAfter(newEl, description);
      scrollDown();
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

function insertAfter(el, referenceNode) {
  referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
  description = el;
}

function scrollDown() {
  descriptionSection.scrollTop = descriptionSection.scrollHeight;
}
