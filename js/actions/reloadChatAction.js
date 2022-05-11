import {AbstractModChatAction} from "./abstractModChatAction.js"

export class ReloadChatAction extends AbstractModChatAction {
    run() {
        location.reload();
    }
}