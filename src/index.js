import "./styles.css";

import { Task } from "./classes/task.js";

import taskModal from "./taskModal/taskModal.html";

import "./projectDisplay/projectsDisplay.js";

import projectModal from "./projectModal/projectModal.html";

import {
    addProjectsToDisplay,
    addProjectsToForm,
} from "./projectDisplay/projectsDisplay.js";
import { ProjectList } from "./classes/project.js";

import { addCardToActiveProject } from "./card/card.js";

//Add modal
const body = document.querySelector("body");
body.insertAdjacentHTML("beforeend", taskModal);
body.insertAdjacentHTML("beforeend", projectModal);

const createTaskModal = document.querySelector("#create-task-modal");
const createTaskBtn = document.querySelector("#create-task-btn");
const projectSelect = document.querySelector("#project-select");

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

//Projects
//List of projects
let projectList = new ProjectList();

//Create default project
projectList.addProject("Daily Tasks");

//Add example task
const exampleTask = new Task(
    "Example task",
    "Welcome to my web app, hope you enjoy it",
    new Date(),
    "medium"
);

projectList.projects[0].addTask(exampleTask);

const cardsDiv = document.querySelector("#cards-div");
const projectsDiv = document.querySelector("#projects-div");
addProjectsToDisplay(projectList, projectsDiv, cardsDiv);

//Add projects to screen, we need to add the task of the active project
addCardToActiveProject(projectList, cardsDiv);

//Create new project
const projectForm = document.querySelector("#project-form");

projectForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(projectForm);

    const projectName = formData.get("project-name");
    projectList.addProject(projectName);

    const inputProject = document.querySelector("#project-form input");
    inputProject.value = "";

    // Only add last project added
    addProjectsToDisplay(projectList, projectsDiv, cardsDiv, true);

    //close modal
    createProjectModal.close();
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

    //Add task to project
    selectedProject.addTask(new Task(title, description, dueDate, priority));

    //Close modal
    createTaskModal.close();

    //Add tasks
    addCardToActiveProject(projectList, cardsDiv);
});
