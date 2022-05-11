const { Chat } = window.TwitchJs;
let token = undefined;
let username = undefined;
let channel = "jvpeek";
const admins = ["jvpeek"];

/*
  Filter für bots
  markierung für channel points

*/

let configName = "doggo";
let gotchi = {};
let params = {};
let defaults = {};

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

// Parse channel parameter
if (urlParams.has('channel')) channel = urlParams.get('channel');
if (urlParams.has('name')) name = urlParams.get('name');
if (urlParams.has('config')) configName = urlParams.get('config');


let botList = [];

function loadBotList() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', "https://jvpeek.de/bots.json", true);
  xhr.responseType = 'json';
  xhr.onload = function() {
    let status = xhr.status;
    if (status === 200) {
      //console.log(xhr.response)
      if (Array.isArray(xhr.response)) {
        botList = xhr.response.map((obj) => obj["name"].toLowerCase() ) //get names from botlist in lower case form
        //console.log(botList)
      }
    }
  };
  xhr.send();
}

const handleMessage = (msg) => {
    if (msg.event != "PRIVMSG") return;

    if (msg.tags.mod == 1 || msg.tags.badges.broadcaster == "1" || admins.includes(msg.username)) {
      modMessage(msg);
    }
    message(msg);
};

function message(msg) {

  if (msg.message === undefined) {
    return;
  }
  if (msg.message.startsWith("!attention")) {
    attentionMode();
  }
  if (msg.message.startsWith("!")) {
    return;
  }
  if (botList.includes(msg.username.toLowerCase())) {
    return;
  }
  let chatObject = document.getElementById("chat");
  let newRow = document.createElement("div");
  let username = document.createElement("span");
  username.appendChild(document.createTextNode(msg.tags.displayName));
  let text = document.createTextNode(": " + msg.message);
  //newRow.innerText = msg.tags.displayName + ": " + msg.message;
  if (msg.tags.color !== undefined) {
    newRow.style.borderColor = msg.tags.color;
    username.style.color = msg.tags.color;

  }
  newRow.appendChild(username);
  newRow.appendChild(text);


  //chatObject.innerHTML += msg.username + ": " + msg.message + "<br />"; // DUMME IDEE
  //eval(msg.message); GANZ DUMME IDEE
  chatObject.appendChild(newRow);

  let options = {
    top: document.body.scrollHeight,
    left: 0,
    behavior: 'smooth'
  }
  window.scrollTo(options);
  cleanMessages();
}
function attentionMode() {
  document.querySelector("body").classList.add("attention");
  window.setTimeout(removeAttentionMode, 10000);
}
function removeAttentionMode() {
  document.querySelector("body").className = "";
}
function cleanMessages() {
  const chatObject = document.getElementById("chat");
  console.log(chatObject.children);
  while (chatObject.children.length > 50) {
    chatObject.children[0].remove();
  }
}
function modMessage(msg) {
  if (msg.message == "!reload") {
    location.reload();
  }
}
function chatsay(channel, text) {
    if (token != undefined) {
        chatobj.say(channel, text);
    } else {
        console.log(text);
    }
}


const run = async () => {
    const chat = new Chat({
        token,
        username,
        log: { level: "warn" }
    });

    chat.on("*", (message) => {
        handleMessage(message);
    });

    await chat.connect();
    await chat.join(channel);

    return chat;
};

loadBotList();
const chatobj = run();
