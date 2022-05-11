import { AbstractChatAction } from "./actions/abstractChatAction.js"

export class ChatViewer {

    /**
     * @param {HTMLElement} chatElement 
     */
    constructor(chatElement) {
        this.chatElement = chatElement
        this.botList = [];
        this.chatActions = []
    }

    /**
     * @param {AbstractChatAction[]} chatActions 
     */
    setChatActions(chatActions) {
        this.chatActions = chatActions
    }

    handleMessage(chatMessage) {
        // TODO: Improve decision making wether to handle message or not
        if (chatMessage.message === undefined || chatMessage.event != "PRIVMSG" || this.botList.includes(chatMessage.username.toLowerCase())) {
            return
        }

        if (this.isActionMessage(chatMessage)) {
            this.handleActionMessage(chatMessage)
            return
        }
        this.appendMessageToChat(chatMessage)
    }

    handleActionMessage(chatMessage) {
        const availableActions = chatActions.filter(chatAction => chatAction.isAllowed(chatMessage))

        const actionName = this.getActionFromChatMessage(chatMessage)
        if (actionName === undefined) {
            console.log(`Invalid action name provided in [${chatMessage.message}]`)
            return
        }

        const actionInstance = availableActions.find(availableAction => availableAction.getName() === actionName)
        if (actionInstance instanceof AbstractChatAction) {
            actionInstance.run()
        } else {
            console.log(`Action [${actionName}] is not implemented`)
        }
    }

    /**
     * @param {any} chatMessage 
     * @returns {boolean}
     */
    isActionMessage(chatMessage) {
        return chatMessage.message.startsWith('!')
    }

    /**
     * @param {any} chatMessage 
     * @returns {undefined|string}
     */
    getActionFromChatMessage(chatMessage) {
        const regexResult = /!([\w]+)/.exec(chatMessage.message)
        return regexResult !== null ? regexResult[1] : undefined
    }

    appendMessageToChat(chatMessage) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message-container")
        const usernameElement = document.createElement("span");
        usernameElement.classList.add("username")
        usernameElement.appendChild(document.createTextNode(chatMessage.tags.displayName));

        if (chatMessage.tags.color !== undefined) {
            messageElement.style.borderColor = chatMessage.tags.color;
            usernameElement.style.color = chatMessage.tags.color;
        }

        messageElement.appendChild(usernameElement);
        messageElement.appendChild(document.createTextNode(`: ${chatMessage.message}`));

        this.chatElement.appendChild(messageElement);

        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        this.cleanMessages();
    }

    cleanMessages() {
        while (this.chatElement.children.length > 50) {
            this.chatElement.children[0].remove();
        }
    }

    async loadBotList() {
        const response = await fetch("https://jvpeek.de/bots.json")
        const botListJson = await response.text()
        try {
            const botList = JSON.parse(botListJson)
            if (Array.isArray(botList)) {
                this.botList = botList.map((bot) => bot.name.toLowerCase())
            }
        } catch (error) {
            console.warn(`caught error while fetching BotList`, error)
        }
    }
}