import { Injectable, inject } from '@angular/core';
import { Task } from './task';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private http = inject(HttpClient);
  
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('/api/taskly');
  }
}
