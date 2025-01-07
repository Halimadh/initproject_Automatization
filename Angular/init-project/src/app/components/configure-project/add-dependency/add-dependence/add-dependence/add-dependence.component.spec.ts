import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDependenceComponent } from './add-dependence.component';

describe('AddDependenceComponent', () => {
  let component: AddDependenceComponent;
  let fixture: ComponentFixture<AddDependenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDependenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDependenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
