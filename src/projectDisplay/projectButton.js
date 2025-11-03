import { addCardOfActiveProject } from "../card/card.js";

//Create project button
/**
 * Creates a project button
 * @param {Project} project project that the button will represent
 * @param {ProjectList} projectList ProjectList object, all projects in ProjectList.projects
 * @param {Elem} cardContainer container that will have all cards
 * @returns returns the project Btn
 */
export default function projectButton(project, projectList, cardContainer) {
    const projectBtn = document.createElement("button");
    projectBtn.classList.add("project-button");
    projectBtn.textContent = project.name;

    if (project.selected) {
        projectBtn.classList.add("project-button-active");
    }

    //
    projectBtn.addEventListener("click", () => {
        //First deselect the active item
        projectList.activeProject().selected = false;
    
        // Remove active class from all project buttons
        document.querySelectorAll(".project-button").forEach((btn) => {
            btn.classList.remove("project-button-active");
        });
    
        project.selected = true;
        projectBtn.classList.add("project-button-active");
    
        //When user changes selected project we need to change the displayed cards
        addCardOfActiveProject(projectList, cardContainer);
    });

    return projectBtn;
}
