import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeletedDeveloperComponent } from './confirm-deleted-developer.component';

describe('ConfirmDeletedDeveloperComponent', () => {
  let component: ConfirmDeletedDeveloperComponent;
  let fixture: ComponentFixture<ConfirmDeletedDeveloperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeletedDeveloperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDeletedDeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
