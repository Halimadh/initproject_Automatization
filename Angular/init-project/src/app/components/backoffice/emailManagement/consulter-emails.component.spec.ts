import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterEmailsComponent } from './consulter-emails.component';

describe('ConsulterEmailsComponent', () => {
  let component: ConsulterEmailsComponent;
  let fixture: ComponentFixture<ConsulterEmailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulterEmailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsulterEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
