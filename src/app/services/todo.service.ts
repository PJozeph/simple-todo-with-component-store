import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../modals/todo.modal';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private httpClient: HttpClient = inject(HttpClient);

  getTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>('http://localhost:3000/todo');
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.httpClient.post<Todo>('http://localhost:3000/todo', todo);
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    return this.httpClient.delete<Todo>(
      `http://localhost:3000/todo/${todo.id}`
    );
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.httpClient.put<Todo>(
      `http://localhost:3000/todo/${todo.id}`,
      todo
    );
  }
}
