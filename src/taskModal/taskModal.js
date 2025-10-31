import {Card} from "../card/card.js";

document.addEventListener("DOMContentLoaded", () => {
    const closeButton = document.querySelector(".close-modal-btn");
    const createTaskModal = document.querySelector("#create-task-modal");
    
    closeButton.addEventListener("click", () => createTaskModal.close());
})


