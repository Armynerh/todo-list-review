export const getTodos = () => JSON.parse(localStorage.getItem('todos')) || [];

export function renderTodos() {
  const todos = getTodos();
  const todolist = todos.sort((a, b) => a.index - b.index).map((todo) => `
      <div class='todo-item ${todo.completed ? 'completed' : ''}' id="todo-item-${todo.index}">
        <label>
          <input type='checkbox' data-id="${todo.index}" class='todo-check' ${todo.completed ? 'checked' : ''} >
          ${todo.description}
        </label>
        <div class='kebab' data-id="${todo.index}">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </div>
        <i class="fa-solid fa-pen-to-square" data-id="${todo.index}"></i>
        <i class="fa-solid fa-trash" data-id="${todo.index}"></i>
      </div>
    `)
    .join('');

  const task = document.querySelector('.tasks');
  task.innerHTML = todolist;

  const editBtn = document.querySelectorAll('.fa-pen-to-square');
  editBtn.forEach((btn) => btn.addEventListener('click', (event) => {
    const { id } = event.target.dataset;
    const todoItem = document.getElementById(`todo-item-${id}`);
    const todoDescription = todoItem.querySelector('label');

    const currentDescription = todoDescription.textContent.trim();
    todoDescription.innerHTML = `
      <input type="text" id="edit-todo-input" value="${currentDescription}">
      <i class="fa-solid fa-check" data-id="${id}"></i>
    `;

    const saveBtn = document.querySelector(`[data-id="${id}"]`);
    saveBtn.addEventListener('click', () => {
      const updatedDescription = document.getElementById('edit-todo-input').value;
      if (updatedDescription.trim() !== '') {
        const index = Number(id);
        const todos = getTodos().map((todo) => {
          if (todo.index === index) {
            todo.description = updatedDescription;
          }
          return todo;
        });

        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
      }
    });
  }));

  const trashBtn = document.querySelectorAll('.fa-trash');
  trashBtn.forEach((btn) => btn.addEventListener('click', (event) => {
    const { id } = event.target.dataset;
    const index = Number(id);
    const todos = getTodos().filter((todo) => todo.index !== index);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
  }));

  const checkbox = document.querySelectorAll('.todo-check');
  checkbox.forEach((n) => n.addEventListener('change', (event) => {
    const { id } = event.target.dataset;
    const index = Number(id);
    const completed = event.target.checked;
    const todos = getTodos().map((todo) => {
      if (todo.index === index) {
        todo.completed = completed;
      }
      return todo;
    });

    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
  }));
  const clearCompletedBtn = document.querySelector('.clear-completed-btn');
  clearCompletedBtn.addEventListener('click', () => {
    const todos = getTodos().filter((todo) => !todo.completed);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
  });
}

export const addTodo = (text) => {
  const todos = getTodos();
  const maxIndex = todos.reduce((max, todo) => (todo.index > max ? todo.index : max), -1);
  const todo = {
    description: text,
    completed: false,
    index: maxIndex + 1, // Assigning the correct index for the new todo
  };
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
};
