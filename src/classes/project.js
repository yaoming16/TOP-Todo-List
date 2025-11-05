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
    constructor(name, selected = false, tasks = []) {
        this.#name = name;
        this.#selected = selected;
        this.#tasks = tasks;
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

    stringify() {
        return JSON.stringify({
            name: this.#name,
            tasks: this.#tasks.map((task) => JSON.parse(task.stringify())),
            selected: this.#selected,
            id: this.#id,
        });
    }
}

export class ProjectList {
    #projects;
    #projectCount;

    constructor(projects = [], projectCount = 0) {
        this.#projects = projects;
        this.#projectCount = projectCount;
    }

    get projects() {
        return this.#projects;
    }

    get projectCount() {
        return this.#projectCount;
    }

    /**
     * Creates a new project and adds it to the projects array if name is passed or adds the project passed directly
     * If it is there isnt any other project in the projects array the project added is set as selected
     * @param {string} name - Name of the project to add  / Only use one parameter, not both. Set the one you dont use to null if needed
     * @param {Project} project - Project object to add directly / Only use one parameter, not both. Set the one you dont use to null if needed
     */
    addProject(name = null, project = null) {
        // When project is passed we add that project directly
        if (project) {
            this.#projects.push(project);
            this.#projectCount++;
            return;
        }

        //When name is passed we create a new project and add it
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

    stringify() {
        return JSON.stringify({
            projects: this.#projects.map((project) => JSON.parse(project.stringify())),
            projectCount: this.#projectCount
        });
    }
}
