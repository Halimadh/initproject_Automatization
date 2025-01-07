import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterFrameworkComponent } from './consulter-framework.component';

describe('ConsulterFrameworkComponent', () => {
  let component: ConsulterFrameworkComponent;
  let fixture: ComponentFixture<ConsulterFrameworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulterFrameworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsulterFrameworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
