import { TestBed } from '@angular/core/testing';
import { TransferState } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { BlogPostResolver } from './blog-post.resolver';

describe('BlogPostResolver', () => {
  let resolver: BlogPostResolver;
  let route: ActivatedRouteSnapshot;
  const mockSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TransferState
      ]
    });
    resolver = TestBed.inject(BlogPostResolver);
    route = new ActivatedRouteSnapshot();
  });

  it('should be created', () => {
    resolver.resolve(route, mockSnapshot);
    expect(resolver).toBeTruthy();
  });
});
