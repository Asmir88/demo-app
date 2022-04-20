import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getEmployees } from './state/actions/employee.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private store: Store) {}

  title = 'demo-app';

  ngOnInit(): void {
    this.store.dispatch(getEmployees());
  }
}
