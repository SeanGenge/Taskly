import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoItem } from '../../models/todoItem.model';
import { AsyncPipe } from '@angular/common';
import { TodoService } from '../todoService';
import { Task } from '../task';

@Component({
  selector: 'app-todo-list',
  imports: [AsyncPipe],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css'
})
export class TodoList {
  private todoService = inject(TodoService);
  task$ = this.todoService.getAllTasks();
}
