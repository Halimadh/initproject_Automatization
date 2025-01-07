import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeveloperToprojectComponent } from './add-developer-toproject.component';

describe('AddDeveloperToprojectComponent', () => {
  let component: AddDeveloperToprojectComponent;
  let fixture: ComponentFixture<AddDeveloperToprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDeveloperToprojectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDeveloperToprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
