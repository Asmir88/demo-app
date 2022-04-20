import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockProvider, MockService } from 'ng-mocks';
import { EmployeeService } from '../employee.service';
import { HeaderSectionComponent } from './header-section.component';

describe('DummySectionComponent', () => {
  let component: HeaderSectionComponent;
  let fixture: ComponentFixture<HeaderSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderSectionComponent ],
      providers: [
        MockProvider(EmployeeService), // option 1
        // { EmployeeService, useValue: MockService(EmployeeService) } // option 2
      ],
      // imports: [ // option 2
      //   HttpClientTestingModule // option 2 
      // ] // option 2
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
