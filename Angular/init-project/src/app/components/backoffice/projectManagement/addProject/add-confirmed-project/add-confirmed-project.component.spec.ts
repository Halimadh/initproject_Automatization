import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConfirmedProjectComponent } from './add-confirmed-project.component';

describe('AddConfirmedProjectComponent', () => {
  let component: AddConfirmedProjectComponent;
  let fixture: ComponentFixture<AddConfirmedProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddConfirmedProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddConfirmedProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
