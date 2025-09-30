import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoItem } from '../../models/todoItem.model';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  imports: [AsyncPipe],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css'
})
export class TodoList {
  private http = inject(HttpClient);
  task$ = this.getTasks();

  private getTasks(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>('https://localhost:7171/api/taskly');
  }
}
