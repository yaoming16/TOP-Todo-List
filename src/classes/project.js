const { v4: uuidv4 } = require("uuid");

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
    constructor(name, selected = false) {
        this.#name = name;
        this.#selected = selected;
        this.#tasks = [];
        this.#id = "P-" + uuidv4();
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

    /**
     * Removes a task of id "taskID" from the tasks array
     * @param {string} taskID id of task we want to delete
     */
    removeTask(taskID) {
        const indexToRemove = this.#tasks.findIndex(
            (elem) => elem.id === taskID
        );
        if (indexToRemove !== -1) {
            this.#tasks.splice(indexToRemove, 1);
        }
    }
}

export class ProjectList {
    #projects;
    #projectCount;
    #priorityFilter;
    #completedFilter;

    constructor() {
        this.#projects = [];
        this.#projectCount = 0;
        this.#completedFilter = "all";
        this.#completedFilter = "all";
    }

    get projects() {
        return this.#projects;
    }

    get projectCount() {
        return this.#projectCount;
    }

    /**
     * Creates and dds a project to the projects list and increses the counter.
     * If it is there isnt any other project in the projects array the project added is set as selected
     * @param {string} name - Name of the project to add .
     */
    addProject(name) {
        //set as active the project if projects is empty
        if (this.#projectCount === 0) {
            this.#projects.push(new Project(name, true));
        } else {
            this.#projects.push(new Project(name, false));
        }
        this.#projectCount++;
    }

    /**
     *Returns the active project or undefined if there is none
     * @returns The project that is active right now
     */
    activeProject() {
        return this.#projects.find((elem) => elem.selected);
    }

    /**
     * Removes the project with "projectID" ID from the "projects" array
     * @param {string} projectID Id of the project we want to remove
     */
    removeProject(projectID) {
        const indexToRemove = this.#projects.findIndex(
            (elem) => elem.id === projectID
        );
        const deletedWasSelected = this.#projects[indexToRemove].selected;
        if (indexToRemove !== -1) {
            this.#projects.splice(indexToRemove, 1);
            this.#projectCount--;
            // check if the project we want to remove is selected
            if (deletedWasSelected) {
                //if selected and projects isnt empty we change other project to selected
                if (this.#projectCount !== 0) {
                    this.#projects[0].selected = true;
                }
            }
        }
    }
}
