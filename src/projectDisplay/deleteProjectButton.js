import deleteButtonSVG from "../card/deleteButton.html";

export function deleteBtn() {
    const button = document.createElement("button");
    button.insertAdjacentHTML("beforeend", deleteButtonSVG);

    return button;
}
