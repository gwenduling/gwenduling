import { TestBed } from '@angular/core/testing';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

let methodSpy: jasmine.Spy;

const eventSubject = new ReplaySubject<RouterEvent>(1);
const routerMock = {
  navigate: jasmine.createSpy('navigate'),
  events: eventSubject.asObservable(),
  url: 'test/url'
};

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();
  });

  it('should create the app', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();

    await fixture.whenStable();
    expect(app).toBeTruthy();
  });

  it('should call method using any RouteEvent', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    methodSpy = spyOn(app, 'checkRouterEvent');

    eventSubject.next(new NavigationStart(1, 'test'));
    eventSubject.next(new NavigationEnd(1, 'test', 'test2'));
    eventSubject.next(new NavigationCancel(1, 'test', 'test2'));
    eventSubject.next(new NavigationError(1, 'test', 'test2'));
    expect(methodSpy).toHaveBeenCalledTimes(4);
  });

  it('should set loading to true on NavigationStart', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.checkRouterEvent(new NavigationStart(1, 'test'));
    expect(app.loading).toBeTruthy();
  });

  it('should set loading to false on NavigationEnd', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.checkRouterEvent(new NavigationEnd(2, 'test', 'test1'));
    expect(app.loading).toBeFalsy();
  });

  it('should set loading to false on NavigationCancel', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.checkRouterEvent(new NavigationCancel(2, 'test', 'test1'));
    expect(app.loading).toBeFalsy();
  });

  it('should set loading to false on NavigationError', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.checkRouterEvent(new NavigationError(2, 'test', 'test1'));
    expect(app.loading).toBeFalsy();
  });
});
