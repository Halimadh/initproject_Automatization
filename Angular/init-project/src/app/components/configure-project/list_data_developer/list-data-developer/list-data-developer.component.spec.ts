import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDataDeveloperComponent } from './list-data-developer.component';

describe('ListDataDeveloperComponent', () => {
  let component: ListDataDeveloperComponent;
  let fixture: ComponentFixture<ListDataDeveloperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDataDeveloperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDataDeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
