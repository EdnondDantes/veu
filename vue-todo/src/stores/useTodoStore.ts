import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>(JSON.parse(localStorage.getItem('todos') || '[]'));

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    todos.value.push(newTodo);
    saveTodos();
  };

  const editTodo = (id: number, newText: string) => {
    const todo = todos.value.find(todo => todo.id === id);
    if (todo) {
      todo.text = newText;
      saveTodos();
    }
  };

  const toggleTodo = (id: number) => {
    const todo = todos.value.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      saveTodos();
    }
  };

  const deleteTodo = (id: number) => {
    const index = todos.value.findIndex(todo => todo.id === id);
    if (index !== -1) {
      todos.value.splice(index, 1); // Реактивное удаление задачи
      saveTodos();
    }
  };

  const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos.value));
  };

  return {
    todos,
    addTodo,
    editTodo,
    toggleTodo,
    deleteTodo,
  };
});
