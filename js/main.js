const { Chat } = window.TwitchJs;
let token = undefined;
let username = undefined;
let channel = "jvpeek";
const admins = ["jvpeek"];











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
  let chatObject = document.getElementById("chat");
  let newRow = document.createElement("div");
  newRow.innerText = msg.tags.displayName + ": " + msg.message;
  if (msg.tags.color !== undefined) {
    newRow.style.borderColor = msg.tags.color;

  }
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
  document.body.classList = "attention red";
  window.setTimeout(document.body.classList = "", 10000);
}
function cleanMessages() {
  let chatObject = document.getElementById("chat");
  console.log(chatObject.children.length);
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

const chatobj = run();
