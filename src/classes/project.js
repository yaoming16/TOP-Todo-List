export class Project {
    #name;
    #tasks;
    #selected;
    #id;

    /**
     * Creates a project Object
     * @param {string} name - Name of the project.
     * @param {number} idNumber - The project number for the id.
     * @param {boolean} selected - Tells if the project is selected.
     */
    constructor(name, idNumber, selected = false) {
        this.#name = name;
        this.#selected = selected;
        this.#tasks = [];
        this.#id = `P-${idNumber}`;
    }

    get name() {
        return this.#name;
    }

    get tasks() {
        return this.#tasks;
    }

    get selected() {
        return this.#selected;
    }

    get id() {
        return this.#id;
    }

    set selected(newState) {
        this.#selected = newState;
    }

    addTask(task) {
        this.#tasks.push(task);
    }
}

export class ProjectList {
    #projects;
    #projectCount;

    constructor() {
        this.#projects = [];
        this.#projectCount = 0;
    }

    get projects() {
        return this.#projects;
    }

    get projectCount() {
        return this.#projectCount;
    }

    /**
     * Creates and dds a project to the projects list nad increses the
     * @param {string} name - Name of the project to add .
     * @param {boolean} selected - Tells if the new project is selected.
     */
    addProject(name, selected = false) {
        this.#projects.push(new Project(name, this.#projectCount, selected));
        this.#projectCount++;
    }
}
