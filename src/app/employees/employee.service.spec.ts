import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { EmployeeService } from './employee.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Employee } from '../state/entity/employee';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpClientMock: HttpTestingController;

  const employee = {
    id: 1,
    firstName: 'Sebastian',
    lastName: 'Eschweiler',
    email: 'sebastian@codingthesmartway.com',
  } as Employee; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(EmployeeService);
    httpClientMock = TestBed.inject(HttpTestingController);
  });

  // These tests do not really add any value

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http client - GET', () => {
    service.getAll().subscribe();

    const req = httpClientMock.expectOne('http://localhost:3100/employees');
    expect(req.request.method).toBe('GET');
  });

  it('should call http client - POST', () => {
    service.create(employee).subscribe();

    const req = httpClientMock.expectOne('http://localhost:3100/employees');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(
      {
        id: 1,
        firstName: 'Sebastian',
        lastName: 'Eschweiler',
        email: 'sebastian@codingthesmartway.com',
      }
    );
  });

  it('should call http client - PUT', () => {
    service.update(employee).subscribe();

    const req = httpClientMock.expectOne('http://localhost:3100/employees/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(
      {
        id: 1,
        firstName: 'Sebastian',
        lastName: 'Eschweiler',
        email: 'sebastian@codingthesmartway.com',
      }
    );
  });
});
