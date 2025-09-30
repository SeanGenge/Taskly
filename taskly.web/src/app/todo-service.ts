import { Injectable, inject, signal } from '@angular/core';
import { Task } from './interfaces/task';
import { HttpClient } from '@angular/common/http';
import { AddTodoItemDTO } from './interfaces/add-todo-item-dto';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private http = inject(HttpClient);
  // Will hold all the todo items from the api
  todoList = signal<Task[]>([]);
  
  fetchTodoList() {
    return this.http.get<Task[]>('/api/taskly').subscribe({
      next: (data: any) => {
        // Update the signal with the new list
        this.todoList.set(data);
      },
      error: (err: any) => {
        console.error("Error fetching todo list!");
      }
    });
  }
  
  addTask(description: string) {
    const newTodoItem: AddTodoItemDTO = { description };
    
    return this.http.post<Task>('/api/taskly', newTodoItem).subscribe({
      next: (data: any) => {
        // Update the signal with the newly added item
        this.todoList.update(rest => [...rest, data]);
      },
      error: (err: any) => {
        console.error("Error adding todo item!");
      }
    });
  }
}
