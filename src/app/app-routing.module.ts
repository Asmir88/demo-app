import { NgModule } from '@angular/core';
import { EmployeesComponent } from './employees/employees.component';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';

const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeesComponent },
  { path: 'employee', component: AddEmployeeComponent },
  { path: 'employee/:id', component: AddEmployeeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
