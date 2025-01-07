import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAddFrameworkComponent } from './confirm-add-framework.component';

describe('ConfirmAddFrameworkComponent', () => {
  let component: ConfirmAddFrameworkComponent;
  let fixture: ComponentFixture<ConfirmAddFrameworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmAddFrameworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmAddFrameworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
