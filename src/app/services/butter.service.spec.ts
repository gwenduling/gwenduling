import { TestBed } from '@angular/core/testing';

import { butterService } from './butter.service';

describe('ButterService', () => {
  let service: typeof butterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    // service = TestBed.inject(butterService);
    service = butterService;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
