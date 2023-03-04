// Select DOM elements
// form element
const form = document.querySelector('#todo-form');
// ul element
const todoList = document.querySelector('#todo-list');

// Initialize an empty array to store the todos
let todos = [];

// Load todos from local storage
const storedTodos = localStorage.getItem('todos');
if (storedTodos) {
  todos = JSON.parse(storedTodos);
  renderTodos();
}

// Add a submit event listener to the form
form.addEventListener('submit', (e) => {
  // preventing the default behavior of the form, the function can perform custom actions on the form data, such as adding the todo item to a list or sending it to a server for processing, without disrupting the user experience.
  e.preventDefault();
  //select the input element with type="text"
  const todoInput = form.querySelector('input[type="text"]');
  const todo = todoInput.value.trim();
  if (todo) {
    addTodoToList(todo);
    saveTodos();
    // Clear the input field
    todoInput.value = '';
  }
});

// Add a todo to the todos array and render the updated list
function addTodoToList(todo) {
  todos.push(todo);
  renderTodos();
}

// Render the todo list by updating the HTML
function renderTodos() {
  // Clear the current list
  todoList.innerHTML = '';
  // Create a new list item for each todo
  // declare forEach function inside renderTodos function
  todos.forEach((todo, index) => {
    const todoItem = createTodoItem(todo, index);
    // appendChild() method adds a node as the last child of a node
    todoList.appendChild(todoItem);
  });
}

// Create a new list item for the given todo
function createTodoItem(todo, index) {
  const li = document.createElement('li');
  // add the task and the remove button to the li element
  li.innerHTML = `
    <span class="todo-item">${todo}</span>
    <button class="remove-todo" data-index="${index}">X</button>
  `;
  li.querySelector('.remove-todo').addEventListener('click', removeTodo);
  return li;
}

// Remove a todo from the todos array and render the updated list
function removeTodo() {
  //select the index of the todo item
  const index = this.dataset.index;
  // remove the todo item from the todos array
  // 1 is the number of items to be removed 
  todos.splice(index, 1);
  renderTodos();
  saveTodos();
}

// Save the current todos array to local storage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}
