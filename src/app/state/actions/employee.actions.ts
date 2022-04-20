import { createAction, props } from '@ngrx/store';
import { Employee } from '../entity/employee';

export enum EmployeeActions  {
    getEmployees = '[Employees] Get Employees',
    getEmployeesSuccess = '[Employees] Get Employees Success',
    createEmployee = '[Employees] Create Employee',
    createEmployeeSuccess = '[Employees] Create Employee Success',
    updateEmployee = '[Employees] Update Employee',
    updateEmployeeSuccess = '[Employees] Update Employee Success'
}

export const getEmployees = createAction(EmployeeActions.getEmployees);

export const getEmployeesSuccess = createAction(EmployeeActions.getEmployeesSuccess, props<{ employees: Employee[] }>());

export const createEmployee = createAction(EmployeeActions.createEmployee, props<{ employee: Employee }>());

export const createEmployeeSuccess = createAction(EmployeeActions.createEmployeeSuccess, props<{ employee: Employee }>());

export const updateEmployee = createAction(EmployeeActions.updateEmployee, props<{ employee: Employee }>());

export const updateEmployeeSuccess = createAction(EmployeeActions.updateEmployeeSuccess, props<{ employee: Employee }>());