import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { MockBuilder } from 'ng-mocks';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  // option 1 - standard configuration
  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [
  //       AppComponent
  //     ],
  //     providers: [
  //       provideMockStore({})
  //     ],
  //     imports: [
  //       RouterTestingModule
  //     ],
  //   }).compileComponents();
  // });

  // option 2 - configured via ng-mock MockBuilder
  beforeEach(async () => {
    TestBed.configureTestingModule(
      MockBuilder()
        .keep(AppComponent)
        .keep(RouterTestingModule)
        .provide(provideMockStore())
        .build()
    );
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'demo-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('demo-app');
  });
});
