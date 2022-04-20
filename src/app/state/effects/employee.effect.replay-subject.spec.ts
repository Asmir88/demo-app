import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockProvider } from 'ng-mocks';
import { of, ReplaySubject } from 'rxjs';
import { EmployeeService } from '../../employees/employee.service';
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

// Same effects tested as in employeee.effect.replay-subject.spec.ts by using jasmine marbles
describe('CallDeviceOverviewEffects via ReplaySubject', () => {
  let effects: EmployeeEffects;
  let actions: ReplaySubject<any>;
  let employeeService: jest.Mocked<EmployeeService>;
  let router: jest.Mocked<Router>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EmployeeEffects,
        provideMockActions(() => actions),
        MockProvider(EmployeeService),
        MockProvider(Router),
      ],
    });

    effects = TestBed.inject(EmployeeEffects);
    router = TestBed.inject(Router) as jest.Mocked<Router>;
    employeeService = TestBed.inject(
      EmployeeService
    ) as jest.Mocked<EmployeeService>;
  });

  it('should dispatch getEmployeesSuccess action', (done) => {
    actions = new ReplaySubject(1);
    jest.spyOn(employeeService, 'getAll').mockReturnValue(of(employees));
    actions.next(EmployeeActions.getEmployees());

    effects.getEmployees$.subscribe((result) => {
      expect(result).toEqual(
        EmployeeActions.getEmployeesSuccess({ employees })
      );
      done();
    });
  });

  it('should dispatch createEmployeeSuccess action', (done) => {
    actions = new ReplaySubject(1);
    jest.spyOn(employeeService, 'create').mockReturnValue(
      of({
        firstName: 'Joe',
        lastName: 'Doe',
        email: 'joe.doe@codingthesmartway.com',
      })
    );

    actions.next(
      EmployeeActions.createEmployee({
        employee: {
          firstName: 'Joe',
          lastName: 'Doe',
          email: 'joe.doe@codingthesmartway.com',
        },
      })
    );

    effects.createEmployee$.subscribe((result) => {
      expect(result).toEqual(
        EmployeeActions.createEmployeeSuccess({
          employee: {
            firstName: 'Joe',
            lastName: 'Doe',
            email: 'joe.doe@codingthesmartway.com',
          },
        })
      );
      done();
    });
  });

  it('should navigate after dspatching createEmployeeSuccess action', (done) => {
    const spy = jest.spyOn(router, 'navigate');
    actions = new ReplaySubject(1);
    actions.next(
      EmployeeActions.createEmployeeSuccess({
        employee: {
          firstName: 'Joe',
          lastName: 'Doe',
          email: 'joe.doe@codingthesmartway.com',
        },
      })
    );

    effects.createEmployeeSuccess$.subscribe(() => {
      expect(spy).toHaveBeenCalled();
      done();
    });
  });

  it('should dispatch updateEmployeeSuccess action', (done) => {
    actions = new ReplaySubject(1);
    jest.spyOn(employeeService, 'update').mockReturnValue(
      of({
        id: 2,
        firstName: 'Joe',
        lastName: 'Doe',
        email: 'joe.doe@codingthesmartway.com',
      })
    );

    actions.next(
      EmployeeActions.updateEmployee({
        employee: {
          id: 2,
          firstName: 'Joe',
          lastName: 'Doe',
          email: 'joe.doe@codingthesmartway.com',
        },
      })
    );

    effects.updateEmployee$.subscribe((result) => {
      expect(result).toEqual(
        EmployeeActions.updateEmployeeSuccess({
          employee: {
            id: 2,
            firstName: 'Joe',
            lastName: 'Doe',
            email: 'joe.doe@codingthesmartway.com',
          },
        })
      );
      done();
    });
  });

  it('should navigate after dspatching updateEmployeeSuccess action', (done) => {
    actions = new ReplaySubject(1);
    const spy = jest.spyOn(router, 'navigate');

    actions.next(
      EmployeeActions.updateEmployeeSuccess({
        employee: {
          id: 2,
          firstName: 'Joe',
          lastName: 'Doe',
          email: 'joe.doe@codingthesmartway.com',
        },
      })
    );

    effects.updateEmployeeSuccess$.subscribe(() => {
      expect(spy).toHaveBeenCalled();
      done();
    });
  });
});
