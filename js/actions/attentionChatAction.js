import {AbstractModChatAction} from "./abstractModChatAction.js"

export class AttentionChatAction extends AbstractModChatAction {
    run() {
        document.querySelector("body").classList.add("attention");
        window.setTimeout(_ => document.querySelector("body").classList.remove("attention"), 1000 * 4);
    }
}