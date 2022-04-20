import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectEmployees } from '../state/selectors/employee.selector';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html'
})
export class EmployeesComponent {

  constructor(
    private store: Store,
    private router: Router
  ) { }

  employees$ = this.store.select(selectEmployees).pipe(map(employees => employees || []));

  public redirectToAddNew() {
    this.router.navigate(['/employee']);
  }
}
