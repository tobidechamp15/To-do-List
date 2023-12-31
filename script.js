//Load stored tasks on page load
window.addEventListener("load", () => {
  loadTasks();
});

var taskInput = document.getElementById("taskInput");
var taskList = document.getElementById("taskList");

// Retrieve tasks from local storage if available
var storedTasks = localStorage.getItem("tasks");
var tasks = storedTasks ? JSON.parse(storedTasks) : [];

// Function to update local storage with the tasks
function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to add a task
function addTask() {
  var input = document.getElementById("taskInput");
  var task = input.value;
  var taskList = document.getElementById("taskList");
  var li = document.createElement("li");

  li.style.cursor = "pointer";
  // li.classList.add("tasklist");
  li.appendChild(document.createTextNode(task));
  // li.addEventListener("click", lineThrough);

  if (task) {
    // Create a new list item
    var li = document.createElement("li");
    li.textContent = task;

    // Create a delete button for the list item
    var deleteBtn = document.createElement("img");
    deleteBtn.src = "cancel.svg";
    deleteBtn.style.display = "none";
    deleteBtn.classList.add("cancel-btn");

    // li.addEventListener("mouseover", function () {
    //   deleteBtn.style.display = "block";
    // });
    // li.addEventListener("mouseout", function () {
    //   deleteBtn.style.display = "none";
    // });
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
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        li.style.textDecoration = "line-through";
        li.style.textDecorationColor = "red";
        li.style.textDecorationThickness = "5px";
        deleteBtn.style.display = "block";
      } else {
        li.style.textDecoration = "none";
        deleteBtn.style.display = "none";
      }
    });

    // li.contentEditable()
    li.setAttribute("contenteditable", "true");

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
  tasks.forEach((task) => {
    var li = document.createElement("li");
    li.textContent = task;

    var deleteBtn = document.createElement("img");
    deleteBtn.src = "cancel.svg";
    deleteBtn.style.display = "none";
    deleteBtn.classList.add("cancel-btn");

    // li.addEventListener("mouseover", function () {
    //   deleteBtn.style.display = "block";
    // });
    // li.addEventListener("mouseout", function () {
    //   deleteBtn.style.display = "none";
    // });
    deleteBtn.addEventListener("click", () => {
      li.remove();
      tasks = tasks.filter((item) => {
        return item !== task;
      });
      updateLocalStorage();
    });
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("my-checkbox-class");
    li.appendChild(checkbox);
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        li.style.textDecoration = "line-through";
        li.style.textDecorationColor = "red";
        li.style.textDecorationThickness = "5px";

        deleteBtn.style.display = "block";
      } else {
        li.style.textDecoration = "none";
        deleteBtn.style.display = "none";
      }
    });
    li.setAttribute("contenteditable", "true");

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// Add task on button click
var button = document.querySelector(".button");
button.addEventListener("click", addTask);

// Add task on Enter key press
taskInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    button.click();
  }
});
