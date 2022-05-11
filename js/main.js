import { ChatViewer } from "./chatViewer.js";
import { AttentionChatAction } from "./actions/attentionChatAction.js"
import { ReloadChatAction } from "./actions/reloadChatAction.js"

const { Chat } = window.TwitchJs;

const token = undefined;
const username = undefined;
const channel = "jvpeek";

const chatViewer = new ChatViewer(document.getElementById("chat"))
chatViewer.setChatActions([
    new AttentionChatAction('attention'),
    new ReloadChatAction('reload')
])

;(async () => {
    const chat = new Chat({
        token,
        username,
        log: { level: "warn" }
    });

    chat.on("*", (message) => {
        chatViewer.handleMessage(message);
    });
    await chat.connect();
    await chat.join(channel);

    return chat;
})()