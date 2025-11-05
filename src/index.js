import "./styles.css";

import { Task } from "./classes/task.js";

import taskModal from "./taskModal/taskModal.html";

import "./projectDisplay/projectsDisplay.js";

import projectModal from "./projectModal/projectModal.html";

import {
    addProjectsToDisplay,
    addProjectsToForm,
} from "./projectDisplay/projectsDisplay.js";

import { ProjectList, Project } from "./classes/project.js";

import { addCardOfActiveProject } from "./card/card.js";

import globals from "./classes/globals.js";

import "./projectModal/projectModal.css";

import "./taskModal/taskModal.css";


// Create ProjectList object and get the dom elements to add content
const cardsDiv = document.querySelector("#cards-div");
const projectsDiv = document.querySelector("#projects-div");
let projectList = new ProjectList();

// Function to create default project
function createDefaultProject() {
    //Create default project
    projectList.addProject("Daily Tasks");

    //Add example task
    const exampleTask = new Task(
        "Example task",
        "Welcome to my web app, hope you enjoy it",
        new Date().toISOString().split('T')[0], 
        "medium"
    );

    projectList.projects[0].addTask(exampleTask);

    addProjectsToDisplay(projectList, projectsDiv, cardsDiv);

    //Add projects to screen, we need to add the task of the active project
    addCardOfActiveProject(projectList, cardsDiv);
}

//save info on local storage
window.addEventListener("beforeunload", () => {
    //Save project list info
    const dataToSave = projectList.stringify();
    window.localStorage.setItem("projectList", dataToSave);

    //Save globals info
    const globalsData = JSON.stringify(globals);
    window.localStorage.setItem("globals", globalsData);
})

//load info from local storage
window.addEventListener("load", () => {
    //Load globals info
    const savedGlobals = window.localStorage.getItem("globals");
    if (savedGlobals) {
        const parsedGlobals = JSON.parse(savedGlobals);
        globals.completedFilter = parsedGlobals.completedFilter;
        globals.priorityFilter = parsedGlobals.priorityFilter;
        
        priorityDivBtn.forEach((btn) => btn.classList.remove("active-priority-filter"));
        completedDivBtn.forEach((btn) => btn.classList.remove("active-completed-filter"));

        console.log(globals.completedFilter, globals.priorityFilter);
        document.querySelector(`#${globals.completedFilter}-btn`).classList.add("active-completed-filter");
        document.querySelector(`#${globals.priorityFilter}-btn`).classList.add("active-priority-filter");

    }
    
    //Load project list info
    const savedData = window.localStorage.getItem("projectList");
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        console.log(parsedData);
        
        parsedData.projects.forEach((projectData, index) => {
            const project = new Project(projectData.name, projectData.selected);
            projectData.tasks.forEach((taskData) => {
                const task = new Task(
                    taskData.title,
                    taskData.description,
                    taskData.dueDate,
                    taskData.priority,
                    taskData.completed,
                );
                project.addTask(task);
            });
            projectList.addProject(null, project);
        });

        //Add projects to display
        addProjectsToDisplay(projectList, projectsDiv, cardsDiv);

        //Add tasks of active project
        addCardOfActiveProject(projectList, cardsDiv);
    }
    else {
        createDefaultProject();
    }
});

//Completed filters buttons
const completedDivBtn = document.querySelectorAll("#completed-div-btn button");
const completedDivBtnArray = ["completed-all", "completed", "to-do"];

//Completed filters events
for (let i = 0; i < completedDivBtnArray.length; i++) {
    completedDivBtn[i + 1].addEventListener("click", (event) => {
        globals.completedFilter = completedDivBtnArray[i];
        addCardOfActiveProject(projectList, cardsDiv);

        completedDivBtn.forEach((btn) => btn.classList.remove("active-completed-filter"));
        event.target.classList.add("active-completed-filter");
    });
}

//Priority filters buttons
const priorityDivBtn = document.querySelectorAll("#priority-div-btn button");
const priorityDivBtnArray = ["priority-all", "low", "medium", "high"];

//Completed filters events
for (let i = 0; i < priorityDivBtnArray.length; i++) {
    priorityDivBtn[i].addEventListener("click", (event) => {
        globals.priorityFilter = priorityDivBtnArray[i];
        addCardOfActiveProject(projectList, cardsDiv);

        priorityDivBtn.forEach((btn) => btn.classList.remove("active-priority-filter"));
        event.target.classList.add("active-priority-filter");
    });
}

//Add modal
const body = document.querySelector("body");
body.insertAdjacentHTML("beforeend", taskModal);
body.insertAdjacentHTML("beforeend", projectModal);

const createTaskModal = document.querySelector("#create-task-modal");
const createTaskBtn = document.querySelector("#create-task-btn");
const projectSelect = document.querySelector("#project-select");
const prioritySelect = document.querySelector("#priority");

//Event to show create task modal
createTaskBtn.addEventListener("click", () => {
    createTaskModal.showModal();
    addProjectsToForm(projectList.projects, projectSelect);
});

const createProjectBtn = document.querySelector("#create-project-btn");
const createProjectModal = document.querySelector("#create-project-modal");

//Event to show the create project btn
createProjectBtn.addEventListener("click", () => {
    createProjectModal.showModal();
});

//Close modal btn
const closeButtons = document.querySelectorAll(".close-modal-btn");
const modals = [createTaskModal, createProjectModal];

closeButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => modals[index].close());
});

//Create new project
const projectForm = document.querySelector("#project-form");

projectForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(projectForm);

    const projectName = formData.get("project-name");

    if (projectName.trim() === "") {
        return;
    }
    
    //Add project to project list
    projectList.addProject(projectName);

    const inputProject = document.querySelector("#project-form input");
    inputProject.value = "";

    // Only add last project added
    addProjectsToDisplay(projectList, projectsDiv, cardsDiv, true);

    //close modal
    createProjectModal.close();
});

// Remove error class when user selects a value
projectSelect.addEventListener("change", () => {
    if (projectSelect.value !== "") {
        projectSelect.classList.remove("select-error");
    }
});

prioritySelect.addEventListener("change", () => {
    if (prioritySelect.value !== "") {
        prioritySelect.classList.remove("select-error");
    }
});

//Add task
const taskForm = document.querySelector("#create-task-form");

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(taskForm);

    const title = formData.get("title");
    const description = formData.get("description");
    const dueDate = formData.get("due-date");
    const priority = formData.get("priority");
    const projectName = formData.get("project-select");

    // Get what project the user wants to add the task
    const selectedProject = projectList.projects.find(
        (project) => projectName === project.name
    );

    if (selectedProject === undefined || priority === null || title.trim() === "" || description.trim() === "" || dueDate === "") {
        if (selectedProject === undefined) {
            projectSelect.classList.add("select-error");
        }
        if (priority === null) {
            prioritySelect.classList.add("select-error");
        }
        return;
    }

    //Add task to project
    selectedProject.addTask(new Task(title, description, dueDate, priority));
    
    //Clear inputs
    const allInputs = document.querySelectorAll("#create-task-form input");
    for (const input of allInputs) {
        input.value = "";
    }

    //Clear selects
    prioritySelect.selectedIndex = 0;
    projectSelect.selectedIndex = 0; // Fixed: was selectedProject.selectedIndex

    //Close modal
    createTaskModal.close();
    
    //Add tasks
    addCardOfActiveProject(projectList, cardsDiv);
});
