import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoItem } from '../../models/todoItem.model';
import { AsyncPipe } from '@angular/common';
import { TodoService } from '../todo-service';
import { Task } from '../interfaces/task';

@Component({
  selector: 'app-todo-list',
  imports: [],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css'
})
export class TodoList {
  todoService = inject(TodoService);
  
  constructor() {
    this.todoService.fetchTodoList();
  }
}
