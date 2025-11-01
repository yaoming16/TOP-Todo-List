//Create project button
export default function projectButton(project) {
    const projectButton = document.createElement("button");
    projectButton.classList.add("project-button");
    projectButton.textContent = project.name;
    projectButton.id = project.id;

    if (project.selected) {
        projectButton.classList.add("project-button-active");
    }

    return projectButton;
}
