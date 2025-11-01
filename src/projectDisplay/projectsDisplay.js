import { Project } from "../classes/project.js";
import projectButton from "./projectButton.js";

import "./projectButton.css";

/**
 * Add projects to a DOM element
 * @param {Project} projects Project to add to container
 * @param {Element} container DOM element where to add the Project
 */
export function addProjectsToDisplay(projects, container) {
    projects.forEach((elem) => {
        const projectBtn = projectButton(elem);

        projectBtn.addEventListener("click", () => {
            //First deselect all buttons
            projects.forEach((item) => {
                item.selected = false;
            });

            // Remove active class from all project buttons
            document.querySelectorAll(".project-button").forEach((btn) => {
                btn.classList.remove("project-button-active");
            });

            elem.selected = true;
            projectBtn.classList.add("project-button-active");
        });

        container.appendChild(projectBtn);
    });
}

/**
 * Adds all the projects in "projects" to the "container"
 * @param {Project[]} projects array of projects
 * @param {Element} container container where the optinos will be added
 */
export function addProjectsToForm(projects, container) {
    //Remove existing options
    for (let i = 1; i < container.children.length; i++) {
        container.children[i].remove();
    }

    console.log(projects);
    //Add new options
    projects.forEach((elem) => {
        const option = document.createElement("option");
        option.textContent = elem.name;
        option.value = elem.name;
        container.appendChild(option);
    });
}
