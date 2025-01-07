import { TestBed } from '@angular/core/testing';

import { DeveloperServiceService } from './developer-service.service';

describe('DeveloperServiceService', () => {
  let service: DeveloperServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeveloperServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
