import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskDeleteDeveloperComponent } from './ask-delete-developer.component';

describe('AskDeleteDeveloperComponent', () => {
  let component: AskDeleteDeveloperComponent;
  let fixture: ComponentFixture<AskDeleteDeveloperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskDeleteDeveloperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskDeleteDeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
