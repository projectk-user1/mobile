import { TestBed, inject } from '@angular/core/testing';

import { MasterFieldsService } from './master-fields.service';

describe('MasterFieldsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MasterFieldsService]
    });
  });

  it('should be created', inject([MasterFieldsService], (service: MasterFieldsService) => {
    expect(service).toBeTruthy();
  }));
});
