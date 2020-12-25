import { TestBed } from '@angular/core/testing';
import { TransferState } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { BlogListResolver } from './blog-list.resolver';

describe('BlogListResolver', () => {
  let resolver: BlogListResolver;
  let route: ActivatedRouteSnapshot;
  const mockSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TransferState
      ]
    });
    resolver = TestBed.inject(BlogListResolver);
    route = new ActivatedRouteSnapshot();
  });

  it('should be created', () => {
    resolver.resolve(route, mockSnapshot);
    expect(resolver).toBeTruthy();
  });
});
