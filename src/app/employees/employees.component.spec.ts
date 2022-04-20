import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeesComponent } from './employees.component';
import { provideMockStore } from '@ngrx/store/testing';
import { HeaderSectionComponent } from './header-section/header-section.component';
import { MockComponent, ngMocks } from 'ng-mocks';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        EmployeesComponent,
        MockComponent(HeaderSectionComponent) // works
        // HeaderSectionComponent // will fail because EmployeeService is not provided
      ],
      providers: [
        provideMockStore({})
      ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('click on button shouls redirect', () => {
    const el = ngMocks.find(['data-testid', 'addButton']);
    const router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate');

    // simulating change
    ngMocks.click(el);

    // asserting
    expect(router.navigate).toHaveBeenCalled();
  });
});
