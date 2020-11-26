// Define UI variables
const form = document.getElementById("task-form");
const filter = document.getElementById("filter");
const taskInput = document.getElementById("task");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // Add task event
  form.addEventListener("submit", addTask);
  // Remove task event
  taskList.addEventListener("click", removeTask);
  // Clear task event
  clearBtn.addEventListener("click", clearTasks);
  // Filter tasks event
  filter.addEventListener("keyup", filterTasks);
}

// Add Task
function addTask(e) {
  if (taskInput.value.trim() === "") {
    alert("Please add a task");
  }

  // Create li element
  const li = document.createElement("li");
  // Add class
  li.className = "collection-item";
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement("a");
  // Add class to link
  link.className = "delete-item secondary-content";
  // Add icon html
  link.innerHTML = '<i class="fas fa-times"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Clear input
  taskInput.value = "";

  e.preventDefault();
}

// Remove Task
function removeTask(e) {
  // Using Event Delegation
  if (e.target.parentElement.classList.contains("delete-item")) {
    const grandparent = e.target.parentElement.parentElement;
    if (
      confirm(`Are you sure you want to remove ${grandparent.textContent}?`)
    ) {
      grandparent.remove();
    }
  }
}

// Clear Tasks
function clearTasks() {
  while (taskList.firstChild) {
    taskList.firstChild.remove();
  }
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  let noResult = true;

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLocaleLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
      noResult = false;
    } else {
      task.style.display = "none";
    }
  });

  // Account for no result
  if (noResult) {
    document.querySelector(".no-result").classList.remove("hide");
  } else {
    document.querySelector(".no-result").classList.add("hide");
  }
}
