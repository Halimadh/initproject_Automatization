import { TestBed } from '@angular/core/testing';

import { ConfigureServiceService } from './configure-service.service';

describe('ConfigureServiceService', () => {
  let service: ConfigureServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigureServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
