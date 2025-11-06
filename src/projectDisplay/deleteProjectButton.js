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
            const newActive = document.querySelector(
                `#${projectList.activeProject().id} button`
            );
            newActive.classList.add("project-button-active");
        }
        //Change display of cards
        addCardOfActiveProject(projectList, cardContainer);
    });

    return button;
}
