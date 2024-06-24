const input = document.getElementById("task");
const enter = document.getElementsByTagName("button")[0];
const listContainer = document.getElementById("list-box");
const list = document.getElementsByTagName("ol")[0];
const bin = document.getElementsByClassName("fa-trash-can");

function addTask(task) {
    const listItem = document.createElement("li");
    const doneTask = document.createElement("i");
    doneTask.className = "fa-solid fa-check"

    const textPart = document.createElement('div')
    const text = document.createTextNode(task);
    textPart.appendChild(text)

    const cross = document.createElement("i");
    cross.className = "fa-regular fa-trash-can";

    listItem.append(doneTask, textPart, cross);
    list.appendChild(listItem);
    input.value = "";

    cross.onclick = () => { deleteTask(listItem) }
    function deleteTask(listItem) {
        list.removeChild(listItem);
    }
    doneTask.onclick = (e) => {
        doneTask.classList.toggle("fa-thumbs-up");
        textPart.classList.toggle("done");
    }
}

input.addEventListener("click", () => {
    input.style.color = "white";
});

enter.addEventListener("click", (e) => {
    if (input.value !== "") {
        addTask(input.value);
    } else {
        input.placeholder = "Please enter a task first";
        input.style.color = "orange";
    }
    e.preventDefault()
});