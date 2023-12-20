import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';
import { Todo } from 'src/app/modals/todo.modal';
import { TodoService } from 'src/app/services/todo.service';

export interface TodoListState {
  todos: Todo[];
}

@Injectable()
export class TodoListStoreService extends ComponentStore<TodoListState> {
  constructor(private todoService: TodoService) {
    super({ todos: [] });
  }

  readonly todos$ = this.select((state) => state.todos);

  setTodoList = this.updater((state, todos: Todo[]) => ({ ...state, todos }));

  readonly fetchTodoList = this.effect(() => {
    return this.todoService
      .getTodos()
      .pipe(tap((todos) => this.setTodoList(todos)));
  });

  readonly addTodoEffect = this.effect((todo$: Observable<Todo>) => {
    return todo$.pipe(
      switchMap((todo) => this.todoService.addTodo(todo)),
      switchMap(() => this.todoService.getTodos()),
      tap((todo) => this.setTodoList(todo))
    );
  });

  readonly updateTodoEffect = this.effect((todo$: Observable<Todo>) => {
    return todo$.pipe(
      switchMap((todo) => this.todoService.updateTodo(todo)),
      switchMap(() => this.todoService.getTodos()),
      tap((todo) => this.setTodoList(todo))
    );
  });

  readonly deleteTodoEffect = this.effect((todo$: Observable<Todo>) => {
    return todo$.pipe(
      switchMap((todo) => this.todoService.deleteTodo(todo)),
      switchMap(() => this.todoService.getTodos()),
      tap((todo) => this.setTodoList(todo))
    );
  });
}
