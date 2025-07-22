import { TestBed } from '@angular/core/testing';

import { ConsumoApiFakeService } from './consumo-api-fake.service';

describe('ConsumoApiFakeService', () => {
  let service: ConsumoApiFakeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumoApiFakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
