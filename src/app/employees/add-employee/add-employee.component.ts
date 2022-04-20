import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { createEmployee, updateEmployee } from '../../state/actions/employee.actions';
import { selectEmployee } from '../../state/selectors/employee.selector';

@Component({
  selector: 'app-employee',
  templateUrl: './add-employee.component.html'
})
export class AddEmployeeComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) { }

  private subscription: Subscription = new Subscription();
  private employeeId: number | undefined;

  form = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeId = parseInt(id);
      this.subscription.add(this.store.select(selectEmployee(parseInt(id))).subscribe(x => this.form.patchValue({
        id: x?.id,
        firstName: x?.firstName,
        lastName: x?.lastName,
        email: x?.email
      })));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public submit(): void {
    const data = this.form.value;
    if (this.employeeId) {
      this.store.dispatch(updateEmployee({employee: data}));
    } else {
      this.store.dispatch(createEmployee({employee: data}));
    }
  }
}
