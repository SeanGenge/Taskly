import { Component, Input, inject } from '@angular/core';
import { Task } from '../interfaces/task';
import { TodoService } from '../services/todo-service';

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css'
})
export class TodoItem {
  @Input() item!: Task;
  todoService = inject(TodoService);
  
  deleteItem(id: string) {
    // Calls /api/taskly/{id} and deletes the todo item
    this.todoService.deleteTask(id);
  }
}
