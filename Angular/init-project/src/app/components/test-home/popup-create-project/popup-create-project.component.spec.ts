import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCreateProjectComponent } from './popup-create-project.component';

describe('PopupCreateProjectComponent', () => {
  let component: PopupCreateProjectComponent;
  let fixture: ComponentFixture<PopupCreateProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupCreateProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupCreateProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
