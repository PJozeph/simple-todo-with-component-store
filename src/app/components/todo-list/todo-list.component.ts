import { Component, inject } from '@angular/core';
import { Todo } from 'src/app/modals/todo.modal';
import { TodoService } from 'src/app/services/todo.service';
import { TodoListStoreService } from './todo-store.services';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [TodoService, TodoListStoreService],
})
export class TodoListComponent {
  private todoListStoreService: TodoListStoreService =
    inject(TodoListStoreService);
  public newTodoTitle: string = '';

  public todoList$ = this.todoListStoreService.todos$;

  deleteTodoAction(todo: Todo) {
    this.todoListStoreService.deleteTodoEffect(todo);
  }

  markTodoAsDoneAction(todo: Todo) {
    todo.completed = true;
    this.todoListStoreService.updateTodoEffect(todo);
  }

  markTodoAsUndoneAction(todo: Todo) {
    todo.completed = false;
    this.todoListStoreService.updateTodoEffect(todo);
  }

  addTodoAction() {
    this.todoListStoreService.addTodoEffect({
      id: Math.random(),
      title: this.newTodoTitle,
      completed: false,
    });
    this.newTodoTitle = '';
  }
}
