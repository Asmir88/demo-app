import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/employee.reducer';
 
export const employeeState = createFeatureSelector<State>('employeesState')

export const selectEmployees = createSelector(
  employeeState,
  (state: State) => state.employees || []
);

export const selectEmployee = (id: number) => createSelector(
  employeeState,
  (state: State) => state.employees?.find(x => x.id === id)
);