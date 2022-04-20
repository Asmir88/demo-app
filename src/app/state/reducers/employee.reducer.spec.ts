import * as EmployeeActionsfrom from '../actions/employee.actions';
import { initialState, reducer, State } from './employee.reducer';

describe('Employees Reducer', () => {
  beforeEach(() => {});

  it('getEmployeesSuccess should update state with emploees', () => {
    const action = EmployeeActionsfrom.getEmployeesSuccess({
      employees: [
        {
          id: 1,
          firstName: 'Sebastian',
          lastName: 'Eschweiler',
          email: 'sebastian@codingthesmartway.com',
        },
        {
          id: 2,
          firstName: 'Steve',
          lastName: 'Palmer',
          email: 'steve@codingthesmartway.com',
        },
        {
          id: 3,
          firstName: 'Ann',
          lastName: 'Smith',
          email: 'ann@codingthesmartway.com',
        },
      ],
    });

    const result: State = reducer(
      {
        ...initialState,
        employees: [],
      },
      action
    );

    expect(result.employees).toEqual([
      {
        id: 1,
        firstName: 'Sebastian',
        lastName: 'Eschweiler',
        email: 'sebastian@codingthesmartway.com',
      },
      {
        id: 2,
        firstName: 'Steve',
        lastName: 'Palmer',
        email: 'steve@codingthesmartway.com',
      },
      {
        id: 3,
        firstName: 'Ann',
        lastName: 'Smith',
        email: 'ann@codingthesmartway.com',
      },
    ]);
  });

  it('createEmployeeSuccess should add created employee to list', () => {
    const action = EmployeeActionsfrom.createEmployeeSuccess({
      employee: {
        id: 4,
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@codingthesmartway.com',
      },
    });

    const result = reducer(
      {
        ...initialState,
        employees: [
          {
            id: 1,
            firstName: 'Sebastian',
            lastName: 'Eschweiler',
            email: 'sebastian@codingthesmartway.com',
          },
          {
            id: 2,
            firstName: 'Steve',
            lastName: 'Palmer',
            email: 'steve@codingthesmartway.com',
          },
          {
            id: 3,
            firstName: 'Ann',
            lastName: 'Smith',
            email: 'ann@codingthesmartway.com',
          },
        ],
      },
      action
    );

    expect(result.employees).toEqual([
      {
        id: 1,
        firstName: 'Sebastian',
        lastName: 'Eschweiler',
        email: 'sebastian@codingthesmartway.com',
      },
      {
        id: 2,
        firstName: 'Steve',
        lastName: 'Palmer',
        email: 'steve@codingthesmartway.com',
      },
      {
        id: 3,
        firstName: 'Ann',
        lastName: 'Smith',
        email: 'ann@codingthesmartway.com',
      },
      {
        id: 4,
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@codingthesmartway.com',
      },
    ]);
  });

  it('updateEmployeeSuccess should update employee in list', () => {
    const action = EmployeeActionsfrom.updateEmployeeSuccess({
      employee: {
        id: 2,
        firstName: 'Joe',
        lastName: 'Doe',
        email: 'joe.doe@codingthesmartway.com',
      },
    });

    const result = reducer(
      {
        ...initialState,
        employees: [
          {
            id: 1,
            firstName: 'Sebastian',
            lastName: 'Eschweiler',
            email: 'sebastian@codingthesmartway.com',
          },
          {
            id: 2,
            firstName: 'Steve',
            lastName: 'Palmer',
            email: 'steve@codingthesmartway.com',
          },
          {
            id: 3,
            firstName: 'Ann',
            lastName: 'Smith',
            email: 'ann@codingthesmartway.com',
          },
        ],
      },
      action
    );

    expect(result.employees).toEqual([
      {
        id: 1,
        firstName: 'Sebastian',
        lastName: 'Eschweiler',
        email: 'sebastian@codingthesmartway.com',
      },
      {
        id: 2,
        firstName: 'Joe',
        lastName: 'Doe',
        email: 'joe.doe@codingthesmartway.com',
      },
      {
        id: 3,
        firstName: 'Ann',
        lastName: 'Smith',
        email: 'ann@codingthesmartway.com',
      },
    ]);
  });
});
