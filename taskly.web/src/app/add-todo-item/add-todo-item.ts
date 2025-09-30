import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TodoService } from '../todo-service';

@Component({
  selector: 'app-add-todo-item',
  imports: [ReactiveFormsModule],
  templateUrl: './add-todo-item.html',
  styleUrl: './add-todo-item.css'
})
export class AddTodoItem {
  todoService = inject(TodoService);
  
  addTodoForm = new FormGroup({
    description: new FormControl('')
  });
  
  addTodoItem() {
    // Calls /api/taskly post with the new todo item
    this.todoService.addTask(this.addTodoForm.value.description ?? '');
    this.addTodoForm.reset();
  }
}
