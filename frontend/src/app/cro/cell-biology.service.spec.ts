import { TestBed } from '@angular/core/testing';

import { CellBiologyService } from './cell-biology.service';

describe('CellBiologyService', () => {
  let service: CellBiologyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CellBiologyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
