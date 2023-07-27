var input = document.getElementById("taskInput");
let tasks = [];
let storedTasks = localStorage.getItem("tasks")

function updateLocalStorage() {
  localStorage.setItem("tasks", tasks);
  console.log(tasks);
}
function addTask() {
  var input = document.getElementById("taskInput");
  var task = input.value;
  var taskList = document.getElementById("taskList");
  var li = document.createElement("li");

  

  li.style.cursor = "pointer";
  // li.classList.add("tasklist");
  li.appendChild(document.createTextNode(task));
  li.addEventListener("click", lineThrough);

  console.log(task);
  function lineThrough() {
    li.style.textDecoration = "line-through";
  }
  console.log(li);
  // taskList.appendChild(li);
  // Clear the input field
  input.value = "";
  if (task) {
    // Create a new list item
    const li = document.createElement("li");
    li.textContent = task;

    // Create a delete button for the list item
    const deleteBtn = document.createElement("img");
    deleteBtn.src = "cancel.svg";
    deleteBtn.style.display = "none";
    deleteBtn.classList.add("cancel-btn");
    //  deleteBtn.textContent = "Delete";
    //  deleteBtn.style.padding = "20px";
    li.addEventListener("mouseover", function () {
      deleteBtn.style.display = "block";
    });
    li.addEventListener("mouseout", function () {
      deleteBtn.style.display = "none";
    });
    deleteBtn.addEventListener("click", function () {
      li.remove();
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

    tasks.push(task);
    updateLocalStorage()
    console.log(tasks);
    // Clear the input field
    taskInput.value = "";
  } else {
    alert("Add a task");
    
  }
}

const button = document.querySelector(".button");
button.addEventListener("click", addTask);
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    // 13 represents the Enter key
    event.preventDefault(); // Prevent the default Enter key behavior (form submission)
    button.click(); // Trigger the button's click event
  }
});
