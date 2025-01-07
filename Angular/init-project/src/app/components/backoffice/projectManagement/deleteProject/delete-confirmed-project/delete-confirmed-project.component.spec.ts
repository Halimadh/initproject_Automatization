import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmedProjectComponent } from './delete-confirmed-project.component';

describe('DeleteConfirmedProjectComponent', () => {
  let component: DeleteConfirmedProjectComponent;
  let fixture: ComponentFixture<DeleteConfirmedProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteConfirmedProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteConfirmedProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
