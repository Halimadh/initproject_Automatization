import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmedAddComponent } from './confirmed-add.component';

describe('ConfirmedAddComponent', () => {
  let component: ConfirmedAddComponent;
  let fixture: ComponentFixture<ConfirmedAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmedAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmedAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
