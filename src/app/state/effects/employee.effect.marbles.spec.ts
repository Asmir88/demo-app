import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { ActionCreator } from '@ngrx/store';
import { MockState, MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { MockProvider } from 'ng-mocks';
import { Observable, of } from 'rxjs';
import { EmployeeService } from '../../employees/employee.service';
import { State } from '../reducers/employee.reducer';
import { EmployeeEffects } from './employee.effects';
import * as EmployeeActions from '../actions/employee.actions';

const employees = [
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
];

// Same effects tested as in employeee.effect.marbles.spec.ts by using ReplaySubject
describe('CallDeviceOverviewEffects', () => {
  let actions: Observable<ActionCreator>;
  let effects: EmployeeEffects;
  let store: MockStore<State>;
  let employeeService: jest.Mocked<EmployeeService>;
  let router: jest.Mocked<Router>;
  let $state: MockState<State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EmployeeEffects,
        provideMockActions(() => actions),
        MockProvider(EmployeeService),
        provideMockStore(),
        MockProvider(Router),
        { provide: '$state', useClass: MockState },
      ],
    });

    effects = TestBed.inject(EmployeeEffects) as jest.Mocked<EmployeeEffects>;
    store = TestBed.inject(MockStore) as jest.Mocked<MockStore<State>>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
    $state = TestBed.inject(MockState) as jest.Mocked<MockState<State>>;
    employeeService = TestBed.inject(
      EmployeeService
    ) as jest.Mocked<EmployeeService>;
  });

  it('should dispatch getEmployeesSuccess action', () => {
    jest.spyOn(employeeService, 'getAll').mockReturnValue(of(employees));

    actions = hot('-a-|', {
      a: EmployeeActions.getEmployees(),
    });

    const expected = cold('-a-|', {
      a: EmployeeActions.getEmployeesSuccess({
        employees: employees,
      }),
    });

    expect(effects.getEmployees$).toBeObservable(expected);
  });

  it('should dispatch createEmployeeSuccess action', () => {
    jest.spyOn(employeeService, 'create').mockReturnValue(
      of({
        id: 4,
        firstName: 'Joe',
        lastName: 'Doe',
        email: 'joe.doe@codingthesmartway.com',
      })
    );

    actions = hot('-a-|', {
      a: EmployeeActions.createEmployee({
        employee: {
          id: 4,
          firstName: 'Joe',
          lastName: 'Doe',
          email: 'joe.doe@codingthesmartway.com',
        },
      }),
    });

    const expected = cold('-a-|', {
      a: EmployeeActions.createEmployeeSuccess({
        employee: {
          id: 4,
          firstName: 'Joe',
          lastName: 'Doe',
          email: 'joe.doe@codingthesmartway.com',
        },
      }),
    });

    expect(effects.createEmployee$).toBeObservable(expected);
  });

  it('should navigate after dspatching createEmployeeSuccess action', () => {
    const spy = jest.spyOn(router, 'navigate');

    actions = hot('-a-|', {
      a: EmployeeActions.createEmployeeSuccess({
        employee: {
          id: 4,
          firstName: 'Joe',
          lastName: 'Doe',
          email: 'joe.doe@codingthesmartway.com',
        },
      }),
    });

    effects.createEmployeeSuccess$.subscribe(() => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('should dispatch updateEmployeeSuccess action', () => {
    jest.spyOn(employeeService, 'update').mockReturnValue(
      of({
        id: 2,
        firstName: 'Joe',
        lastName: 'Doe',
        email: 'joe.doe@codingthesmartway.com',
      })
    );

    actions = hot('-a-|', {
      a: EmployeeActions.updateEmployee({
        employee: {
          id: 2,
          firstName: 'Joe',
          lastName: 'Doe',
          email: 'joe.doe@codingthesmartway.com',
        },
      }),
    });

    const expected = cold('-a-|', {
      a: EmployeeActions.updateEmployeeSuccess({
        employee: {
          id: 2,
          firstName: 'Joe',
          lastName: 'Doe',
          email: 'joe.doe@codingthesmartway.com',
        },
      }),
    });

    expect(effects.updateEmployee$).toBeObservable(expected);
  });

  it('should navigate after dspatching updateEmployeeSuccess action', () => {
    const spy = jest.spyOn(router, 'navigate');

    actions = hot('-a-|', {
      a: EmployeeActions.updateEmployeeSuccess({
        employee: {
          id: 4,
          firstName: 'Joe',
          lastName: 'Doe',
          email: 'joe.doe@codingthesmartway.com',
        },
      }),
    });

    effects.updateEmployeeSuccess$.subscribe(() => {
      expect(spy).toHaveBeenCalled();
    });
  });
});