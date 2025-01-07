import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConfirmDependenceComponent } from './add-confirm-dependence.component';

describe('AddConfirmDependenceComponent', () => {
  let component: AddConfirmDependenceComponent;
  let fixture: ComponentFixture<AddConfirmDependenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddConfirmDependenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddConfirmDependenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
