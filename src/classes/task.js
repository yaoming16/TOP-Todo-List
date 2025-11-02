export class Task {
    #title;
    #description;
    #dueDate;
    #priority;
    #completed;

    /**
     *
     * @param {string} title
     * @param {string} description
     * @param {Date} dueDate
     * @param {string} priority Only use this values: "low", "medium", "high"
     */
    constructor(title, description, dueDate, priority) {
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;
        this.#completed = false;
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
}
