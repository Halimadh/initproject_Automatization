import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfimationDialogComponent } from './ask-confirmation-delete-dialog.component';

describe('DeleteConfimationDialogComponent', () => {
  let component: DeleteConfimationDialogComponent;
  let fixture: ComponentFixture<DeleteConfimationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteConfimationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteConfimationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
