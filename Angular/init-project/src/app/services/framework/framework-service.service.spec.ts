import { TestBed } from '@angular/core/testing';

import { FrameworkServiceService } from './framework-service.service';

describe('FrameworkServiceService', () => {
  let service: FrameworkServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrameworkServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
