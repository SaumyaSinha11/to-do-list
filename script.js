const input = document.getElementById("task");
const enter = document.getElementsByTagName("button")[0];
const listContainer = document.getElementById("list-box");
const list = document.getElementsByTagName("ol")[0];

// Function to save tasks to localStorage
function saveTasksToLocalStorage() {
  const tasks = [];
  document.querySelectorAll("ol li").forEach((item) => {
    const taskText = item.querySelector("div").textContent;
    const isDone = item
      .querySelector(".fa-solid")
      .classList.contains("fa-thumbs-up");
    tasks.push({ text: taskText, completed: isDone });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasksFromLocalStorage() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (savedTasks) {
    savedTasks.forEach((task) => {
      addTask(task.text, task.completed);
    });
  }
}

function addTask(task, completed = false) {
  const listItem = document.createElement("li");
  const doneTask = document.createElement("i");
  doneTask.className = "fa-solid fa-check";
  if (completed) {
    doneTask.classList.add("fa-thumbs-up");
  }

  const textPart = document.createElement("div");
  const text = document.createTextNode(task);
  textPart.appendChild(text);
  if (completed) {
    textPart.classList.add("done");
  }

  const cross = document.createElement("i");
  cross.className = "fa-regular fa-trash-can";

  listItem.append(doneTask, textPart, cross);
  list.appendChild(listItem);
  input.value = "";

  // Delete task
  cross.onclick = () => {
    deleteTask(listItem);
    saveTasksToLocalStorage(); // Update storage
  };

  function deleteTask(listItem) {
    list.removeChild(listItem);
  }

  // Mark task as done
  doneTask.onclick = (e) => {
    doneTask.classList.toggle("fa-thumbs-up");
    textPart.classList.toggle("done");
    saveTasksToLocalStorage(); // Update storage
  };

  saveTasksToLocalStorage(); // Update storage
}

// Highlight input box
input.addEventListener("click", () => {
  input.style.color = "white";
});

// Add task on button click
enter.addEventListener("click", (e) => {
  if (input.value !== "") {
    addTask(input.value);
  } else {
    input.placeholder = "Please enter a task first";
    input.style.color = "orange";
  }
  e.preventDefault();
});

// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);
