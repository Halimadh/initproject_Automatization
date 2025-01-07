import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeDetailsUserComponent } from './see-details-user.component';

describe('SeeDetailsUserComponent', () => {
  let component: SeeDetailsUserComponent;
  let fixture: ComponentFixture<SeeDetailsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeDetailsUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeDetailsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
