import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupConfirmModifyComponent } from './popup-confirm-modify.component';

describe('PopupConfirmModifyComponent', () => {
  let component: PopupConfirmModifyComponent;
  let fixture: ComponentFixture<PopupConfirmModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupConfirmModifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupConfirmModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
