import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/employee.actions';
import { Employee } from '../entity/employee';

export interface State {
  employees?: Employee[];
}

export const initialState: State = {
  employees: [],
};

const employeeReducer = createReducer(
  initialState,
  // GET
  on(actions.getEmployeesSuccess, (state, result) => ({employees: result.employees})),
  
  // CREATE
  on(actions.createEmployeeSuccess, (state, result) => ({employees: [...state.employees!].concat(result.employee)})),
  
  // UPDATE
  on(actions.updateEmployeeSuccess, (state, result) => {
    const employees = [...state.employees!];
    const index = employees?.findIndex(x => x.id === result.employee.id);
    employees[index] = result.employee;
    return {employees: employees}
  })
);

export function reducer(state: State | undefined, action: Action): any {
  return employeeReducer(state, action);
}