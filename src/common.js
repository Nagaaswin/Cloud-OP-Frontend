export const url ='https://general-arc-java.herokuapp.com'; //'http://localhost:5000';  // 'https://general-arc-java-1.herokuapp.com';// 

const websocket = 'wss://general-arc-java.herokuapp.com/websocket'; //'ws://localhost:5000/websocket';  // 'wss://general-arc-java-1.herokuapp.com/websocket'; // 

let description = document.querySelector('p:last-of-type');

const descriptionSection = document.querySelector('#description');

export let stompClient = null;

export function stompClientConnect() {
  stompClient = new window.StompJs.Client({
    webSocketFactory: function () {
      return new WebSocket(websocket);
    },
  });
}

export function onSocketClose() {
  if (stompClient !== null) {
    stompClient.deactivate();
  }
  console.log('Socket was closed. Setting connected to false!');
}

export function noProcessRunning() {
  if (description.innerHTML != 'Currently, No Process is Running.') {
    let newEl = document.createElement('p');
    newEl.innerHTML = 'Currently, No Process is Running.';
    insertAfter(newEl, description);
    scrollDown();
  }
}

export function statusMessage(content) {
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

export function processAlreadyRunning() {
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

function insertAfter(el, referenceNode) {
  referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
  description = el;
}

function scrollDown() {
  descriptionSection.scrollTop = descriptionSection.scrollHeight;
}
