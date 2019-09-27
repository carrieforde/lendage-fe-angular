import { TestBed } from '@angular/core/testing';

import { LoanAppService } from './loan-app.service';

describe('LoanAppService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoanAppService = TestBed.get(LoanAppService);
    expect(service).toBeTruthy();
  });
});
