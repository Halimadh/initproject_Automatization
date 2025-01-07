import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeDetailDeveloperComponent } from './see-detail-developer.component';

describe('SeeDetailDeveloperComponent', () => {
  let component: SeeDetailDeveloperComponent;
  let fixture: ComponentFixture<SeeDetailDeveloperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeDetailDeveloperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeDetailDeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
