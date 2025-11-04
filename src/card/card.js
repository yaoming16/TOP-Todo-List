import { ProjectList } from "../classes/project";
import "./card.css";
import deleteButtonSVG from "./deleteButton.html";

import globals from "../classes/globals.js";

/**
 * Creates a card element to show a task
 * @param {Task} task the Task we want to show in the card
 * @param {number} cardNumber number to asign id for the checkbox label
 * @param {ProjectList} projectList ProjectList object
 * @param {Element} cardContainer container where the cards are added
 * @return a card DOM element with the data of the task
 */
function createCard(task, cardNum, projectList, cardContainer) {
    //Card container
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card-div");
    cardDiv.dataset.priority = task.priority;

    if(task.completed) {
        cardDiv.classList.add("completed-card-div");
    }

    //Card title
    const cardH3 = document.createElement("h3");
    cardH3.textContent = task.title;

    //Priority
    const cardPriority = document.createElement("p");
    cardPriority.textContent = `Priority: ${task.priority}`;

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

    //Change status of the taks on checkbox click
    cardStatus.addEventListener("click", () => {
        task.completed = !task.completed;

        if (task.completed) {
            cardDiv.classList.add("completed-card-div");
        } else {
            cardDiv.classList.remove("completed-card-div");
        }
    });

    statusDiv.appendChild(statusLabel);
    statusDiv.appendChild(cardStatus);

    //Card Date
    const dateP = document.createElement("p");
    dateP.textContent = task.dueDate;

    //Add the delete button
    const deleteButton = document.createElement("button");

    const activeProject = projectList.activeProject();
    //Delete functionality
    deleteButton.addEventListener("click", () => {
        activeProject.removeTask(task.id);
        addCardOfActiveProject(projectList, cardContainer);
    });

    deleteButton.insertAdjacentHTML("beforeend", deleteButtonSVG);

    cardDiv.appendChild(cardH3);
    cardDiv.appendChild(cardPriority);
    cardDiv.appendChild(cardDesc);
    cardDiv.appendChild(dateP);
    cardDiv.appendChild(statusDiv);
    cardDiv.appendChild(deleteButton);

    return cardDiv;
}

/**
 * Creates "Cards" based on the active project in "projectList", then adds them to "container"
 * @param {ProjectList} projectList
 * @param {Element} cardContainer
 */
export function addCardOfActiveProject(projectList, cardContainer) {
    //Remove content
    while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild);
    }
    console.log(globals.priorityFilter);

    let activeProjectTasks = projectList.activeProject() !== undefined?  [...projectList.activeProject().tasks] : [];
    //Need to filter the array before creating and showing the cards
    //Filter for completed
    if (globals.completedFilter === "to-do") {
        activeProjectTasks = activeProjectTasks.filter(
            (currentTask) => currentTask.completed === false
        );
    }
    if (globals.completedFilter === "completed") {
        activeProjectTasks = activeProjectTasks.filter(
            (currentTask) => currentTask.completed === true
        );
    }

    //Filter for priority
    if (globals.priorityFilter === "low") {
        activeProjectTasks = activeProjectTasks.filter(
            (currentTask) => currentTask.priority === "low"
        );
    }
    if (globals.priorityFilter === "medium") {
        activeProjectTasks = activeProjectTasks.filter(
            (currentTask) => currentTask.priority === "medium"
        );
    }

    if (globals.priorityFilter === "high") {
        activeProjectTasks = activeProjectTasks.filter(
            (currentTask) => currentTask.priority === "high"
        );
    }

    for (let i = 0; i < activeProjectTasks.length; i++) {
        const card = createCard(
            activeProjectTasks[i],
            i,
            projectList,
            cardContainer
        );
        cardContainer.appendChild(card);
    }
}
