import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeveloperComponent } from './list-developer.component';

describe('ListDeveloperComponent', () => {
  let component: ListDeveloperComponent;
  let fixture: ComponentFixture<ListDeveloperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDeveloperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
