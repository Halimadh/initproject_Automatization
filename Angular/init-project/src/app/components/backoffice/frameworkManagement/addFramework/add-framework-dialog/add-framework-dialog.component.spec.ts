import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFrameworkDialogComponent } from './add-framework-dialog.component';

describe('AddFrameworkDialogComponent', () => {
  let component: AddFrameworkDialogComponent;
  let fixture: ComponentFixture<AddFrameworkDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFrameworkDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFrameworkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
