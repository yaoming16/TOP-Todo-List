import { Project, ProjectList } from "../classes/project.js";
import projectButton from "./projectButton.js";
import { addCardToActiveProject } from "../card/card.js";
import { deleteBtn } from "./deleteProjectButton.js";

import "./projectButton.css";

/**
 * Add projects to a DOM element
 * @param {ProjectList} projectList ProjectList of objects Projects to  display
 * @param {Element} projectContainer DOM element where to add the Project
 * @param {Element} cardContainer Dom element where the cards are added
 * @param {boolean} onlyLast boolean value to set if we only want to add the last value
 */
export function addProjectsToDisplay(
    projectList,
    projectContainer,
    cardContainer,
    onlyLast = false
) {
    // Set if only add last project to the display
    let projectsArray;
    if (!onlyLast) {
        projectsArray = projectList.projects;
    } else {
        projectsArray = [projectList.projects[projectList.projectCount - 1]];
    }

    projectsArray.forEach((elem) => {
        //Create project div
        const projectDiv = document.createElement("div");
        projectDiv.id = elem.id;

        //Create project button
        const projectBtn = projectButton(elem);
        projectBtn.addEventListener("click", () => {
            //First deselect the active item
            projectList.activeProject().selected = false;

            // Remove active class from all project buttons
            document.querySelectorAll(".project-button").forEach((btn) => {
                btn.classList.remove("project-button-active");
            });

            elem.selected = true;
            projectBtn.classList.add("project-button-active");

            //When user changes selected project we need to change the displayed cards
            addCardToActiveProject(projectList, cardContainer);
        });

        //Add delete button and functionality
        const deleteProjectBtn = deleteBtn();
        deleteProjectBtn.addEventListener("click", () => {
            document.querySelector(`#${elem.id}`).remove();
            projectList.removeProject(elem.id);
            if (projectList.projectCount !== 0) {
                document
                    .querySelector(
                        `#${projectList.activeProject().id} button:first-child`
                    )
                    .classList.add("project-button-active`");
            }
        });

        projectDiv.appendChild(projectBtn);
        projectDiv.appendChild(deleteProjectBtn);

        projectContainer.appendChild(projectDiv);
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

    //Add new options
    projects.forEach((elem) => {
        const option = document.createElement("option");
        option.textContent = elem.name;
        option.value = elem.name;
        container.appendChild(option);
    });
}
