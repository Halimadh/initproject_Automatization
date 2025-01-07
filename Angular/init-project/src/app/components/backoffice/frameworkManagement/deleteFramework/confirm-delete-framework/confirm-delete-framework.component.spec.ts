import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteFrameworkComponent } from './confirm-delete-framework.component';

describe('ConfirmDeleteFrameworkComponent', () => {
  let component: ConfirmDeleteFrameworkComponent;
  let fixture: ComponentFixture<ConfirmDeleteFrameworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteFrameworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDeleteFrameworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
