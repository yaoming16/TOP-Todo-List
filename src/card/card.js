import { ProjectList } from "../classes/project";
import "./card.css";
import deleteButtonSVG from "./deleteButton.html";

/**
 * Creates a card element to show a task
 * @param {Task} task the Task we want to show in the card
 */
function createCard(task, cardNum) {
    //Card container
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card-div");

    //Card title
    const cardH3 = document.createElement("h3");
    cardH3.textContent = task.title;

    //Card description
    const cardDesc = document.createElement("p");
    cardDesc.textContent = task.description;

    //Card status
    const statusDiv = document.createElement("div");

    const statusLabel = document.createElement("label");
    statusLabel.textContent = "Completed ?";
    statusLabel.for = `CB-${cardNum}`;

    const cardStatus = document.createElement("input");
    cardStatus.type = "checkBox";
    cardStatus.id = `CB-${cardNum}`;
    task.completed ? (cardStatus.checked = true) : (cardStatus.checked = false);

    statusDiv.appendChild(statusLabel);
    statusDiv.appendChild(cardStatus);

    //Card Date
    const dateP = document.createElement("p");
    dateP.textContent = task.dueDate;

    cardDiv.appendChild(cardH3);
    cardDiv.appendChild(cardDesc);
    cardDiv.appendChild(dateP);
    cardDiv.appendChild(statusDiv);

    return cardDiv;
}

/**
 * Creates "Cards" based on the active project in "projectList", then adds them to "container"
 * @param {ProjectList} projectList
 * @param {Element} container
 */
export function addCardToActiveProject(projectList, container) {
    //Remove content
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const activeProject = projectList.activeProject();
    activeProject.tasks.forEach((element, index) => {
        const card = createCard(element, index);
        //Add the delete button
        const deleteButton = document.createElement("button");

        //Delete functionality
        deleteButton.addEventListener("click", () => {
            activeProject.removeTask(element.id);
            addCardToActiveProject(projectList, container);
        });

        deleteButton.insertAdjacentHTML("beforeend", deleteButtonSVG);
        card.appendChild(deleteButton);

        container.appendChild(card);
    });
}
