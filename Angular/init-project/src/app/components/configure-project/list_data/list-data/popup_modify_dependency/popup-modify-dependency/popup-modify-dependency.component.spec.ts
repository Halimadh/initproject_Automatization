import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupModifyDependencyComponent } from './popup-modify-dependency.component';

describe('PopupModifyDependencyComponent', () => {
  let component: PopupModifyDependencyComponent;
  let fixture: ComponentFixture<PopupModifyDependencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupModifyDependencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupModifyDependencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
