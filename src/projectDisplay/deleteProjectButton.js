import { addCardOfActiveProject } from "../card/card.js";

import deleteButtonSVG from "../card/deleteButton.html";

export function deleteBtn(project, projectList, cardContainer) {
    const button = document.createElement("button");
    button.insertAdjacentHTML("beforeend", deleteButtonSVG);
    button.classList.add("delete-project-button");

    button.addEventListener("click", () => {
        document.querySelector(`#${project.id}`).remove();
        projectList.removeProject(project.id);

        if (projectList.projectCount !== 0) {
            const newActive = document.querySelector(`#${projectList.activeProject().id}`)
            newActive.classList.add("project-button-active");

            //There is a new active project so we change the cards display
            addCardOfActiveProject(projectList, cardContainer);             
        }
    });

    return button;
}
