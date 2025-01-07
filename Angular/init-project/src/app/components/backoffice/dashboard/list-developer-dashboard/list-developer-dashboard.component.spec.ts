import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeveloperDashboardComponent } from './list-developer-dashboard.component';

describe('ListDeveloperDashboardComponent', () => {
  let component: ListDeveloperDashboardComponent;
  let fixture: ComponentFixture<ListDeveloperDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDeveloperDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDeveloperDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
