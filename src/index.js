import "./styles.css";
import "./taskModal/taskModal.css";

import "./taskModal/taskModal.js";
import {card} from "./card/card.js";

import taskModal from "./taskModal/taskModal.html";

//Add modal
const body = document.querySelector("body");
body.insertAdjacentHTML("beforeend", taskModal);

const createTaskModal = document.querySelector("#create-task-modal");
const createTaskBtn = document.querySelector("#create-task-btn");

createTaskModal.close();

//Event to show create task modal
createTaskBtn.addEventListener("click", () => {
    createTaskModal.showModal();
})
