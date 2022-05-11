export class AbstractChatAction {

    constructor(name) {
        this.name = name
    }

    isAllowed(message) {
        return true
    }

    run() {
        throw Error(`Action [${this.prototype.name}] has to run action defined`)
    }

    getName() {
        return this.name
    }
}