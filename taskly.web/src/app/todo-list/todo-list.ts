import { Component, inject } from '@angular/core';
import { TodoService } from '../todo-service';
import { TodoItem } from '../todo-item/todo-item';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItem],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css'
})
export class TodoList {
  todoService = inject(TodoService);
  
  constructor() {
    this.todoService.fetchTodoList();
  }
}
