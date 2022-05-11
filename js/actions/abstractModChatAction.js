import {AbstractChatAction} from "./abstractChatAction.js"

export class AbstractModChatAction extends AbstractChatAction {
    static admins = ["jvpeek"]

    isAllowed(message) {
        return message.tags.mod == 1 || message.tags.badges.broadcaster == "1" || AbstractModChatAction.admins.includes(message.username)
    }
}