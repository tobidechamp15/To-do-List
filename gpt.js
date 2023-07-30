let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");

// Retrieve tasks from local storage if available
let storedTasks = localStorage.getItem("tasks");
let tasks = storedTasks ? JSON.parse(storedTasks) : [];

// Function to update local storage with the tasks
function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to add a task
function addTask() {
  let task = taskInput.value;

  if (task) {
    // Create a new list item
    let li = document.createElement("li");
    li.textContent = task;

    // Create a delete button for the list item
    let deleteBtn = document.createElement("img");
    deleteBtn.src = "cancel.svg";
    deleteBtn.style.display = "none";
    deleteBtn.classList.add("cancel-btn");

    li.addEventListener("mouseover", function () {
      deleteBtn.style.display = "block";
    });
    li.addEventListener("mouseout", function () {
      deleteBtn.style.display = "none";
    });
    deleteBtn.addEventListener("click", function () {
      li.remove();


      tasks = tasks.filter(function (item) {
        return item !== task;
      });
      updateLocalStorage();
    });

    // Append the delete button to the list item
    li.appendChild(deleteBtn);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("my-checkbox-class");
    li.appendChild(checkbox);
    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        li.style.textDecoration = "line-through";
      } else {
        li.style.textDecoration = "none";
      }
    });

    // Append the list item to the task list
    taskList.appendChild(li);

    // Add the task to the tasks array
    tasks.push(task);
    updateLocalStorage();

    // Clear the input field
    taskInput.value = "";
  } else {
    alert("Add a task");
  }
}

// Function to load the stored tasks on page load
function loadTasks() {
  tasks.forEach(function (task) {
    let li = document.createElement("li");
    li.textContent = task;

    let deleteBtn = document.createElement("img");
    deleteBtn.src = "cancel.svg";
    deleteBtn.style.display = "none";
    deleteBtn.classList.add("cancel-btn");

    li.addEventListener("mouseover", function () {
      deleteBtn.style.display = "block";
    });
    li.addEventListener("mouseout", function () {
      deleteBtn.style.display = "none";
    });
    deleteBtn.addEventListener("click", function () {
      li.remove();
      tasks = tasks.filter(function (item) {
        return item !== task;
      });
      updateLocalStorage();
    });
const checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.classList.add("my-checkbox-class");
li.appendChild(checkbox);
checkbox.addEventListener("change", function () {
  if (checkbox.checked) {
    li.style.textDecoration = "line-through";
  } else {
    li.style.textDecoration = "none";
  }
});
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// Load stored tasks on page load
window.addEventListener("load", function () {
  loadTasks();
});

// Add task on button click
let button = document.querySelector(".button");
button.addEventListener("click", addTask);

// Add task on Enter key press
taskInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    button.click();
  }
});
