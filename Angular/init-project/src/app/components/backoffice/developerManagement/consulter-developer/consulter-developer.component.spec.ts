import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterDeveloperComponent } from './consulter-developer.component';

describe('ConsulterDeveloperComponent', () => {
  let component: ConsulterDeveloperComponent;
  let fixture: ComponentFixture<ConsulterDeveloperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulterDeveloperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsulterDeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
