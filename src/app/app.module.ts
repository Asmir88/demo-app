import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { TableModule } from 'primeng/table';
import { EmployeeEffects } from './state/effects/employee.effects';
import { HttpClientModule } from '@angular/common/http';
import { reducer as employeeReducer } from './state/reducers/employee.reducer'
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderSectionComponent } from './employees/header-section/header-section.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    AddEmployeeComponent,
    HeaderSectionComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    StoreModule.forRoot({}), 
    StoreModule.forFeature('employeesState', employeeReducer),
    StoreDevtoolsModule.instrument(),
    TableModule,
    ButtonModule,
    InputTextModule,
    EffectsModule.forRoot([EmployeeEffects]),
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
