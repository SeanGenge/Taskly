import { Component, signal } from '@angular/core';
import { TodoList } from './todo-list/todo-list';
import { Title } from './title/title';
import { AddTodoItem } from './add-todo-item/add-todo-item';

@Component({
  selector: 'app-root',
  imports: [TodoList, Title, AddTodoItem],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('taskly');
}
