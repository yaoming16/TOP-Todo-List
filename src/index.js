import "./styles.css";

import { Card } from "./classes/card.js";

import taskModal from "./taskModal/taskModal.html";

import "./projectDisplay/projectsDisplay.js";

import projectModal from "./projectModal/projectModal.html";

import {
    addProjectsToDisplay,
    addProjectsToForm,
} from "./projectDisplay/projectsDisplay.js";
import { ProjectList } from "./classes/project.js";

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
projectList.addProject("Daily Tasks", true);

const projectsDiv = document.querySelector("#projects-div");
addProjectsToDisplay(projectList.projects, projectsDiv);

//Create new project
const projectForm = document.querySelector("#project-form");

projectForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(projectForm);

    const projectName = formData.get("project-name");
    projectList.addProject(projectName);

    // Only add last project added
    addProjectsToDisplay(
        [projectList.projects[projectList.projectCount - 1]],
        projectsDiv
    );
});
