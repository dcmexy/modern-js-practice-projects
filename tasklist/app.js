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
  // DOM Load event
  document.addEventListener("DOMContentLoaded", loadTasks);
  // Add task event
  form.addEventListener("submit", addTask);
  // Remove task event
  taskList.addEventListener("click", removeTask);
  // Clear task event
  clearBtn.addEventListener("click", clearTasks);
  // Filter tasks event
  filter.addEventListener("keyup", filterTasks);
}

// Get Tasks from Local Storage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem("tasks"));
  }
}

// Load Tasks
function loadTasks() {
  // Get Tasks from Local Storage if any
  const tasks = getTasks();

  tasks.forEach(function (task) {
    // Create List Item
    createListItem(task);
  });
}

// Add Task
function addTask(e) {
  if (taskInput.value.trim() === "") {
    alert("Please add a task");
  } else {
    // Create List item
    createListItem(taskInput.value);

    // Store in LocalStorage
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = "";
  }

  e.preventDefault();
}

// Create List Element
function createListItem(listItemValue) {
  // Create li element
  const li = document.createElement("li");
  // Add class
  li.className = "collection-item";
  // Create text node and append to li
  li.appendChild(document.createTextNode(listItemValue));
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
}

// Store Task in Local Storage
function storeTaskInLocalStorage(task) {
  // Get Tasks from Local Storage if any
  const tasks = getTasks();

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  // Using Event Delegation
  if (e.target.parentElement.classList.contains("delete-item")) {
    const grandparent = e.target.parentElement.parentElement;
    if (
      confirm(`Are you sure you want to remove ${grandparent.textContent}?`)
    ) {
      // Remove task from Local Storage
      removeTaskFromLocalStorage(grandparent);

      // Remove from DOM
      grandparent.remove();
    }
  }
}

// Remove task from Local Storage
function removeTaskFromLocalStorage(taskItem) {
  // Get Tasks from Local Storage if any
  const tasks = getTasks();

  if (tasks.includes(taskItem.textContent)) {
    // Get index of list item
    let index = [...taskItem.parentElement.children].indexOf(taskItem);

    // Remove Item from list
    tasks.splice(index, 1);
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
  while (taskList.firstChild) {
    taskList.firstChild.remove();
  }
  clearTasksfromLocalStorage();
}

// Clear tasks from Local Storage
function clearTasksfromLocalStorage() {
  localStorage.clear();
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
