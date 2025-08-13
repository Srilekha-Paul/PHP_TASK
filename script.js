let todos = JSON.parse(localStorage.getItem("todos")) || [];

const input = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("todoList");
const taskCount = document.getElementById("taskCount");

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  list.innerHTML = "";

  // Using map() to generate list items
  todos.map((todo, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${todo}</span>
      <div>
        <button class="edit" onclick="editTodo(${index})">Edit</button>
        <button onclick="deleteTodo(${index})">Delete</button>
      </div>
    `;
    list.appendChild(li);
  });

  // Using reduce() to count tasks
  taskCount.textContent = todos.reduce((count) => count + 1, 0);
}

function addTodo() {
  const task = input.value.trim();
  if (task) {
    // Using push() to add new task
    todos.push(task);
    saveTodos();
    renderTodos();
    input.value = "";
  }
}

function editTodo(index) {
  const newTask = prompt("Edit your task:", todos[index]);
  if (newTask) {
    // Using slice() to replace only the selected task
    todos = [
      ...todos.slice(0, index),
      newTask,
      ...todos.slice(index + 1)
    ];
    saveTodos();
    renderTodos();
  }
}

function deleteTodo(index) {
  // Using filter() to remove task
  todos = todos.filter((_, i) => i !== index);
  saveTodos();
  renderTodos();
}

addBtn.addEventListener("click", addTodo);
window.addEventListener("load", renderTodos);
