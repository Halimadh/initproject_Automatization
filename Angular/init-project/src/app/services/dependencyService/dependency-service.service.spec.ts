import { TestBed } from '@angular/core/testing';

import { DependencyServiceService } from './dependency-service.service';

describe('DependencyServiceService', () => {
  let service: DependencyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DependencyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
