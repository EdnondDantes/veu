<template>
   <div class="todo-container">
     <h1>To-Do List</h1>
     <div class="input-container">
       <input v-model="newTodoText" placeholder="Add new task" class="todo-input" />
       <button @click="addNewTodo" class="add-btn">Add Task</button>
     </div>
 
     <ul class="todo-list">
       <li v-for="todo in todos" :key="todo.id" class="todo-item">
         <input 
           type="text" 
           :class="{ completed: todo.completed }" 
           v-model="todo.text" 
           @blur="editTodo(todo.id, todo.text)" 
           class="todo-text"
         />
         <button @click="toggleTodo(todo.id)" class="complete-btn">
           {{ todo.completed ? 'Undo' : 'Complete' }}
         </button>
         <button @click="deleteTodo(todo.id)" class="delete-btn">Delete</button>
       </li>
     </ul>
   </div>
 </template>
 
 <script lang="ts" setup>
 import { ref } from 'vue';
import { useTodoStore } from '../stores/useTodoStore';
 
 const newTodoText = ref('');
 const { todos, addTodo, editTodo, toggleTodo, deleteTodo } = useTodoStore();
 
 const addNewTodo = () => {
   if (newTodoText.value.trim()) {
     addTodo(newTodoText.value);
     newTodoText.value = '';
   }
 };
 </script>
 
 <style scoped>
 .todo-container {
   max-width: 600px;
   margin: 0 auto;
   padding: 20px;
   background-color: #f9f9f9;
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
   border-radius: 8px;
 }
 
 h1 {
   text-align: center;
   color: #333;
   margin-bottom: 20px;
 }
 
 .input-container {
   display: flex;
   justify-content: space-between;
   margin-bottom: 20px;
 }
 
 .todo-input {
   flex-grow: 1;
   padding: 10px;
   font-size: 16px;
   border: 2px solid #ccc;
   border-radius: 4px;
   margin-right: 10px;
 }
 
 .add-btn {
   padding: 10px 20px;
   background-color: #4caf50;
   color: white;
   border: none;
   border-radius: 4px;
   cursor: pointer;
 }
 
 .add-btn:hover {
   background-color: #45a049;
 }
 
 .todo-list {
   list-style-type: none;
   padding: 0;
 }
 
 .todo-item {
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 10px;
   padding: 10px;
   background-color: #fff;
   border: 1px solid #ddd;
   border-radius: 4px;
 }
 
 .todo-text {
   flex-grow: 1;
   padding: 10px;
   font-size: 16px;
   border: none;
   outline: none;
 }
 
 .todo-text.completed {
   text-decoration: line-through;
   color: #888;
 }
 
 .complete-btn {
   margin-right: 10px;
   padding: 5px 10px;
   background-color: #ff9800;
   color: white;
   border: none;
   border-radius: 4px;
   cursor: pointer;
 }
 
 .complete-btn:hover {
   background-color: #fb8c00;
 }
 
 .delete-btn {
   padding: 5px 10px;
   background-color: #f44336;
   color: white;
   border: none;
   border-radius: 4px;
   cursor: pointer;
 }
 
 .delete-btn:hover {
   background-color: #e53935;
 }
 </style>
 