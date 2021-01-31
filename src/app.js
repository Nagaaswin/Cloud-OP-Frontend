const description = document.querySelector('p:last-of-type');
const form = document.querySelector('#copyDetails');
const stopCopy = document.querySelector('#stopCopy');
const url = 'https://general-arc-java.herokuapp.com'; //'http://localhost:5000'; //
let stompClient = null;
let flag = false;

//checking
stompClient = new window.StompJs.Client({
  webSocketFactory: function () {
    return new WebSocket('wss://general-arc-java.herokuapp.com/websocket');
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
    destination: '/app/send',
    body: JSON.stringify({
      from: 'asdsa',
      message: 'adsa',
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
  stompClient.subscribe('/topic/messages', function (message) {
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

axios.get(`${url}/setUpRclone`);

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
    axios.post(`${url}/change`, fd);
    setTimeout(sendMessage, 2000);
  } catch (err) {
    console.log(err);
  }
}
