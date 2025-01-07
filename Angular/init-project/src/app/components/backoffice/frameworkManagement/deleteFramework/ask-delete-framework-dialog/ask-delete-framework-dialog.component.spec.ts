import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskDeleteFrameworkDialogComponent } from './ask-delete-framework-dialog.component';

describe('AskDeleteFrameworkDialogComponent', () => {
  let component: AskDeleteFrameworkDialogComponent;
  let fixture: ComponentFixture<AskDeleteFrameworkDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskDeleteFrameworkDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskDeleteFrameworkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
