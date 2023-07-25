import { renderTodos } from './todo-func.js';

export const refresh = () => {
  renderTodos(); // Now “renderTodos” can be called after it’s defined
};
export const getTodos = () => JSON.parse(localStorage.getItem('todos')) || [];
export const updateStatus = (index, completed) => {
  let todos = getTodos();
  todos = todos.map((todo) => {
    if (todo.index === index) {
      todo.completed = completed;
    }
    return todo;
  });
  localStorage.setItem('todos', JSON.stringify(todos));
  refresh();
};
export const clearCompleted = () => {
  let todos = getTodos();
  todos = todos.filter((todo) => !todo.completed);
  localStorage.setItem('todos', JSON.stringify(todos));
  refresh();
};
export function handleCheckBoxChange() {
  const { id } = this;
  const completed = this.checked;
  updateStatus(Number(id), completed);
}