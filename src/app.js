const description = document.querySelector('p:last-of-type');
const form = document.querySelector('#copyDetails');
const stopCopy = document.querySelector('#stopCopy');
const url =  'https://general-arc-java.herokuapp.com' //  'http://localhost:5000'; // 
let stompClient = null;

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
    //console.log(message);
    var msg = JSON.parse(message.body);
    if (msg.isalive == 'true') {
      showMessage(msg);
      sendMessage();
    } else {
      return;
    }
  });
}

function showMessage(message) {
  //console.log(message);
  const content = message.content;
  description.insertAdjacentHTML('afterend', `<p>${content}</p>`);
}

axios.get(`${url}/setUpRclone`);

//let time = setInterval(statusOfTheTerminal, 2000);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  copyRequest();
});

stopCopy.addEventListener('submit', (event) => {
  event.preventDefault();
  stopCopyHandler();
});

async function stopCopyHandler() {
  try {
    axios.get(`${url}/stopCopying`);
    //clearInterval(time);
  } catch (err) {
    console.log(err);
  }
}

async function copyRequest() {
  try {
    const fd = new FormData(form);
    axios.post(`${url}/change`, fd);
    setTimeout(sendMessage, 2000);
    //time = setInterval(statusOfTheTerminal, 2000);
    // statusOfTheTerminal();
  } catch (err) {
    console.log(err);
  }
}

// async function statusOfTheTerminal() {
//   try {
//     const response = await axios.get(`${url}/status`);
//     if (response.data.isAlive == 'false') {
//       clearInterval(time);
//       return;
//     } else {
//       const content = response.data.Content;
//       description.insertAdjacentHTML('afterend', `<p>${content}</p>`);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }
