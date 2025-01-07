import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetVersionByFrameworkComponent } from './get-version-by-framework.component';

describe('GetVersionByFrameworkComponent', () => {
  let component: GetVersionByFrameworkComponent;
  let fixture: ComponentFixture<GetVersionByFrameworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetVersionByFrameworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetVersionByFrameworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
