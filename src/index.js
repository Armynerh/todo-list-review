import './style.css';
import { addTodo, renderTodos } from './todo-func.js';
import { clearCompleted } from './completed.js';

const addBtn = document.querySelector('.todo-add-btn');

addBtn.addEventListener('click', () => {
  const txtInput = document.getElementById('todo-input');
  const text = txtInput.value.trim();
  if (text !== '') {
    addTodo(text);
    txtInput.value = '';
    txtInput.focus();
  }
});

const clearCompletedBtn = document.querySelector('.clear-completed-btn');
clearCompletedBtn.addEventListener('click', clearCompleted);

document.addEventListener('DOMContentLoaded', () => {
  renderTodos();
});

// Add event listener to the refresh icon
const refreshIcon = document.querySelector('.fa-sync');
refreshIcon.addEventListener('click', () => {
  renderTodos();
});
