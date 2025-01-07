import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConfirmDeveloperComponent } from './add-confirm-developer.component';

describe('AddConfirmDeveloperComponent', () => {
  let component: AddConfirmDeveloperComponent;
  let fixture: ComponentFixture<AddConfirmDeveloperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddConfirmDeveloperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddConfirmDeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
