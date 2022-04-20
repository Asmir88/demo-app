import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EmployeeService } from '../../employees/employee.service';
import { createEmployeeSuccess, EmployeeActions, getEmployeesSuccess, updateEmployeeSuccess } from '../actions/employee.actions';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable()
export class EmployeeEffects {
  constructor(
    private actions$: Actions,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  getEmployees$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.getEmployees),
      switchMap(() => {
        return this.employeeService
        .getAll()
        .pipe(map((employees) => {
            return getEmployeesSuccess({ employees });
        }));
      })
    )
  );

  createEmployee$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.createEmployee),
      switchMap((action: any) => {
        return this.employeeService
        .create(action.employee)
        .pipe(map((employee) => createEmployeeSuccess({ employee })))
      })
    )
  );

  createEmployeeSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.createEmployeeSuccess),
      tap((action: any) => {
        this.router.navigate(['']);
      })
    ),
    { dispatch: false }
  );

  updateEmployee$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.updateEmployee),
      switchMap((action: any) => {
        return this.employeeService
        .update(action.employee)
        .pipe(map((employee) => {
            return updateEmployeeSuccess({ employee });
        }));
      })
    )
  );

  updateEmployeeSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.updateEmployeeSuccess),
      tap((action: any) => {
        this.router.navigate(['']);
      })
    ),
    { dispatch: false }
  );
}