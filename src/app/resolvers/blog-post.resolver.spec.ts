import { PLATFORM_ID } from '@angular/core';
import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { BlogPost } from '../models/blog.model';
import { ButterApiService } from '../services/butter-api.service';
import { mockBlogPost } from '../test-data/blog';
import { BlogPostResolver } from './blog-post.resolver';

describe('BlogPostResolver', () => {
  let resolver: BlogPostResolver;
  let route: ActivatedRouteSnapshot;
  const mockSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>(
    'RouterStateSnapshot',
    ['toString']
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        [TransferState, { provide: PLATFORM_ID, useValue: 'server' }],
      ],
    });
    resolver = TestBed.inject(BlogPostResolver);
    route = new ActivatedRouteSnapshot();
  });

  it('should be created', () => {
    resolver.resolve(route, mockSnapshot);
    expect(resolver).toBeTruthy();
  });

  it('should set transfer state when running on server', fakeAsync(() => {
    const transferState = TestBed.inject(TransferState);
    const butterService = TestBed.inject(ButterApiService);

    spyOn(transferState, 'set');
    spyOn(butterService, 'getPost').and.returnValue(
      Promise.resolve(mockBlogPost)
    );

    resolver.resolve(route, mockSnapshot);
    flushMicrotasks();
    expect(transferState.set).toHaveBeenCalledTimes(1);
  }));

  it('should not make duplicate API calls', fakeAsync(() => {
    const transferState = TestBed.inject(TransferState);
    const butterService = TestBed.inject(ButterApiService);

    transferState.set(
      makeStateKey<Promise<BlogPost>>('slug-test-post'),
      mockBlogPost
    );
    spyOn(transferState, 'set');
    spyOn(butterService, 'getPost').and.returnValue(
      Promise.resolve(mockBlogPost)
    );

    route.params = {
      slug: 'test-post',
    };
    resolver.resolve(route, mockSnapshot);
    flushMicrotasks();
    expect(butterService.getPost).not.toHaveBeenCalled();
  }));

  it('should use correct state key', fakeAsync(() => {
    const transferState = TestBed.inject(TransferState);
    const butterService = TestBed.inject(ButterApiService);

    spyOn(transferState, 'set');
    spyOn(butterService, 'getPost').and.returnValue(
      Promise.resolve(mockBlogPost)
    );

    route.params = {
      slug: 'test',
    };
    resolver.resolve(route, mockSnapshot);
    flushMicrotasks();
    expect(transferState.set).toHaveBeenCalledWith(
      makeStateKey<Promise<BlogPost>>('slug-test'),
      mockBlogPost
    );
  }));
});
