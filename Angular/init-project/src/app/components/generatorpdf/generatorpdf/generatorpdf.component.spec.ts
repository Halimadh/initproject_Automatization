import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratorpdfComponent } from './generatorpdf.component';

describe('GeneratorpdfComponent', () => {
  let component: GeneratorpdfComponent;
  let fixture: ComponentFixture<GeneratorpdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratorpdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratorpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
