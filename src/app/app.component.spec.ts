import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { of, Subject } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let routerMock: Router;
  let routerEvents$: Subject<any>;
  let currentUrl: string; 

  beforeEach(async () => {
    routerEvents$ = new Subject<any>();
    currentUrl = '/'; 
    routerMock = {
      navigate: jasmine.createSpy('navigate'),
      events: routerEvents$
    } as unknown as Router;

    Object.defineProperty(routerMock, 'url', {
      configurable: true,
      get: () => currentUrl
    });

    await TestBed.configureTestingModule({
      imports: [AppComponent, MatCardModule, RouterOutlet, SidebarComponent, FooterComponent],
      providers: [
       {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '123' } },
            params: of({ id: '123' }) 
          }
        }
    ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the title "invoice-generator"', () => {
    expect(component.title).toBe('invoice-generator');
  });

  it('should initialize showFooter as false', () => {
    expect(component.showFooter).toBeFalse();
  });

  it('should keep showFooter false when navigating to a route other than "/product-list"', () => {
    currentUrl = '/dashboard';
    routerEvents$.next({});
    fixture.detectChanges();
    expect(component.showFooter).toBeFalse();
  });
});
