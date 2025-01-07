import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterProjectComponent } from './consulter-project.component';

describe('ConsulterProjectComponent', () => {
  let component: ConsulterProjectComponent;
  let fixture: ComponentFixture<ConsulterProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulterProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsulterProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
