import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { IMockBuilderConfig, MockBuilder } from 'ng-mocks';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AddEmployeeComponent } from './add-employee.component';

describe('AddEmployeeComponent', () => {
  let component: AddEmployeeComponent;
  let fixture: ComponentFixture<AddEmployeeComponent>;

  describe('dispatch update action', () => {
    // option 1
    // beforeEach(async () => {
    //   await TestBed.configureTestingModule({
    //     declarations: [ AddEmployeeComponent ],
    //     providers: [
    //       provideMockStore({}),
    //       { provide: ActivatedRoute, useValue: {
    //         snapshot: {
    //           paramMap: convertToParamMap({
    //             id: '1'
    //           })
    //         }
    //       }
    //     }
    //     ],
    //     imports: [
    //       ButtonModule,
    //       ReactiveFormsModule,
    //       InputTextModule
    //     ]
    //   })
    //   .compileComponents();
    // });

    // option 2
    beforeEach(async () => {
      await TestBed.configureTestingModule(
        MockBuilder()
          .keep(AddEmployeeComponent)
          .provide(provideMockStore())
          // .provide({
          //   provide: ActivatedRoute,
          //   useValue: {
          //     snapshot: {
          //       paramMap: convertToParamMap({
          //         id: '1',
          //       }),
          //     },
          //   },
          // })
          .mock(ActivatedRoute, {
              snapshot: {
                paramMap: convertToParamMap({
                  id: '1',
                }),
              },
            } as IMockBuilderConfig)
          .keep(ButtonModule)
          .keep(ReactiveFormsModule)
          .keep(InputTextModule)
          .build()
      );
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(AddEmployeeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have valid form when filled in', () => {
      expect(component.form.invalid).toBeTruthy();

      component.form.patchValue({
        firstName: 'Joe',
        lastName: 'Doe',
        email: 'joe.doe@test.com',
      });

      expect(component.form.valid).toBeTruthy();
    });

    it('should dispatch update action', () => {
      const store = TestBed.inject(Store);
      component.form.patchValue({
        id: 1,
        firstName: 'Joe',
        lastName: 'Doe',
        email: 'joe.doe@test.com',
      });

      const spy = jest.spyOn(store, 'dispatch');
      component.submit();

      expect(store.dispatch).toHaveBeenCalledWith({
        employee: {
          id: 1,
          firstName: 'Joe',
          lastName: 'Doe',
          email: 'joe.doe@test.com',
        },
        type: '[Employees] Update Employee',
      } as any);
    });
  });

  describe('dispatch create action', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule(
        MockBuilder()
          .keep(AddEmployeeComponent)
          .provide(provideMockStore())
          .provide({
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                paramMap: convertToParamMap({
                  id: '',
                }),
              },
            },
          })
          .keep(ButtonModule)
          .keep(ReactiveFormsModule)
          .keep(InputTextModule)
          .build()
      );
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(AddEmployeeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should dispatch create action', () => {
      const store = TestBed.inject(Store);
      component.form.patchValue({
        firstName: 'Joe',
        lastName: 'Doe',
        email: 'joe.doe@test.com',
      });

      const spy = jest.spyOn(store, 'dispatch');
      component.submit();

      expect(store.dispatch).toHaveBeenCalledWith({
        employee: {
          id: '',
          firstName: 'Joe',
          lastName: 'Doe',
          email: 'joe.doe@test.com',
        },
        type: '[Employees] Create Employee',
      } as any);
    });
  });
});
