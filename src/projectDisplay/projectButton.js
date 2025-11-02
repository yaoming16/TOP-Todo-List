import deleteButtonSVG from "../card/deleteButton.html";

//Create project button
export default function projectButton(project) {
    const projectButton = document.createElement("button");
    projectButton.classList.add("project-button");
    projectButton.textContent = project.name;
    projectButton.id = project.id;

    if (project.selected) {
        projectButton.classList.add("project-button-active");
    }

    // Here bug
    projectButton.insertAdjacentElement("beforeend", deleteButtonSVG);

    return projectButton;
}
