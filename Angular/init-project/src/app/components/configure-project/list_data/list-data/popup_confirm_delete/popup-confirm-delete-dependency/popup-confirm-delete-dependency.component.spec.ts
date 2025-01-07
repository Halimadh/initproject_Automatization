import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupConfirmDeleteDependencyComponent } from './popup-confirm-delete-dependency.component';

describe('PopupConfirmDeleteDependencyComponent', () => {
  let component: PopupConfirmDeleteDependencyComponent;
  let fixture: ComponentFixture<PopupConfirmDeleteDependencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupConfirmDeleteDependencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupConfirmDeleteDependencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
