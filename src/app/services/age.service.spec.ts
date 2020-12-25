import { TestBed } from '@angular/core/testing';

import { AgeService } from './age.service';

describe('AgeService', () => {
  let service: AgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 24 age as of 2020', () => {
    expect(24).toBe(service.getAge('2020/12/04'));
  });

  it('should return 25 age as of 2021 birthday', () => {
    expect(25).toBe(service.getAge('2021/03/06'));
  });

  it('should return 24 age a day before 2021 birthday', () => {
    expect(24).toBe(service.getAge('2021/03/05'));
  });

  it('should not return NaN when no date is specified', () => {
    expect(service.getAge()).not.toBeNaN();
  });
});
