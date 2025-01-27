import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVersionComponent } from './delete-version.component';

describe('DeleteVersionComponent', () => {
  let component: DeleteVersionComponent;
  let fixture: ComponentFixture<DeleteVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteVersionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
