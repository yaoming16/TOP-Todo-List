const { v4: uuidv4, stringify } = require("uuid");

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
    constructor(title, description, dueDate, priority, completed = false) {
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;
        this.#completed = completed;
        this.#id = "T-" + uuidv4();
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

    //Only set completed as oposite of what already is
    set completed(newValue) {
        this.#completed = !this.#completed;
    }

    get id() {
        return this.#id;
    }

    stringify() {
        return JSON.stringify({
            title: this.#title,
            description: this.#description,
            dueDate: this.#dueDate,
            priority: this.#priority,
            completed: this.#completed,
            id: this.#id,
        });
    }
}
