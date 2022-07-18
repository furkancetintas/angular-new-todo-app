import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoModel } from './models/todo.model';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoForm !: FormGroup;
  todo: TodoModel[] = [];
  doing: TodoModel[] = [];
  done: TodoModel[] = [];

  updateIndex !: any;
  isEditEnabled: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required]
    })
  }

  addTask() {
    this.todo.push({
      description: this.todoForm.value.item,
      done: false
    });
    localStorage.setItem('todo', JSON.stringify(this.todo));
    this.todoForm.reset();
  }

  onEdit(item: TodoModel, i: number) {
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnabled = true;
    localStorage.setItem('todo', JSON.stringify(this.todo));
  }

  updateTask() {
    this.todo[this.updateIndex].description = this.todoForm.value.item;
    this.todo[this.updateIndex].done = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
    localStorage.setItem('todo', JSON.stringify(this.todo));
  }

  deleteTask(i: number) {
    this.todo.splice(i, 1);
    localStorage.setItem('todo', JSON.stringify(this.todo));
  }

  deleteInDoing(i: number) {
    this.doing.splice(i, 1);
    localStorage.setItem('todo', JSON.stringify(this.doing));
  }

  deleteInDone(i: number) {
    this.done.splice(i, 1);
    localStorage.setItem('todo', JSON.stringify(this.done));
  }

  drop(event: CdkDragDrop<TodoModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      localStorage.setItem('todo', JSON.stringify(this.todo));
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
