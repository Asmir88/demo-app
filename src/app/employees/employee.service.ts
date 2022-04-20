import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Employee } from '../state/entity/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>('http://localhost:3100/employees');
  }

  create(data: Employee): Observable<Employee> {
    return this.http.post<Employee>('http://localhost:3100/employees', data);
  }

  update(data: Employee): Observable<Employee> {
    return this.http.put<Employee>(`http://localhost:3100/employees/${data.id}`, data);
  }

  getTitle(): string {
    return "Employee management";
  }
}
