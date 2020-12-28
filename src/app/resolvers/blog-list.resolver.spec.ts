import { PLATFORM_ID } from '@angular/core';
import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { BlogList } from '../models/blog.model';
import { ButterApiService } from '../services/butter-api.service';
import { mockBlogList } from '../test-data/blog';
import { BlogListResolver } from './blog-list.resolver';

describe('BlogListResolver', () => {
  let resolver: BlogListResolver;
  let route: ActivatedRouteSnapshot;
  const mockSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>(
    'RouterStateSnapshot',
    ['toString']
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransferState, { provide: PLATFORM_ID, useValue: 'server' }],
    });
    resolver = TestBed.inject(BlogListResolver);
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
    spyOn(butterService, 'getList').and.returnValue(
      Promise.resolve(mockBlogList)
    );

    resolver.resolve(route, mockSnapshot);
    flushMicrotasks();
    expect(transferState.set).toHaveBeenCalledTimes(1);
  }));

  it('should not make duplicate API calls', fakeAsync(() => {
    const transferState = TestBed.inject(TransferState);
    const butterService = TestBed.inject(ButterApiService);

    transferState.set(
      makeStateKey<Promise<BlogList>>('category-blog'),
      mockBlogList
    );
    spyOn(transferState, 'set');
    spyOn(butterService, 'getList').and.returnValue(
      Promise.resolve(mockBlogList)
    );

    resolver.resolve(route, mockSnapshot);
    flushMicrotasks();
    expect(butterService.getList).not.toHaveBeenCalled();
  }));

  it('should use correct state key', fakeAsync(() => {
    const transferState = TestBed.inject(TransferState);
    const butterService = TestBed.inject(ButterApiService);

    spyOn(transferState, 'set');
    spyOn(butterService, 'getList').and.returnValue(
      Promise.resolve(mockBlogList)
    );

    route.params = {
      category: 'personal',
    };
    resolver.resolve(route, mockSnapshot);
    flushMicrotasks();
    expect(transferState.set).toHaveBeenCalledWith(
      makeStateKey<Promise<BlogList>>('category-personal'),
      mockBlogList
    );
  }));
});
