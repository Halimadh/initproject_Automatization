import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmedComponent } from './delete-confirmed.component';

describe('DeleteConfirmedComponent', () => {
  let component: DeleteConfirmedComponent;
  let fixture: ComponentFixture<DeleteConfirmedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteConfirmedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
