const { v4: uuidv4 } = require("uuid");

export class Task {
    #title;
    #description;
    #dueDate;
    #priority;
    #completed;
    #id;

    /**
     *
     * @param {string} title
     * @param {string} description
     * @param {Date} dueDate
     * @param {string} priority Only use this values: "low", "medium", "high"
     * @param {string} id
     */
    constructor(title, description, dueDate, priority, id) {
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;
        this.#completed = false;
        this.#id = uuidv4();
    }

    get title() {
        return this.#title;
    }

    get description() {
        return this.#description;
    }

    get dueDate() {
        return this.#dueDate;
    }

    get priority() {
        return this.#priority;
    }

    get completed() {
        return this.#completed;
    }

    get id() {
        return this.#id;
    }
}
