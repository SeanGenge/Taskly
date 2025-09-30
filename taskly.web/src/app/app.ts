import { Component, signal } from '@angular/core';
import { TodoList } from './todo-list/todo-list';
import { Title } from './title/title';

@Component({
  selector: 'app-root',
  imports: [TodoList, Title],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('taskly.web');
}
