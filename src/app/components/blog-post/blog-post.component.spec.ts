import {
  ComponentFixture,
  fakeAsync,
  flushMicrotasks,
  TestBed,
} from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { PLATFORM_ID } from '@angular/core';

import { State } from '../../models/state.model';
import { ButterApiService } from '../../services/butter-api.service';
import { BlogPostComponent } from './blog-post.component';
import { BlogPost } from '../../models/blog.model';
import { mockBlogList, mockBlogPost, mockTags } from '../../test-data/blog';

describe('BlogPostComponent', () => {
  let component: BlogPostComponent;
  let fixture: ComponentFixture<BlogPostComponent>;
  let mockPost: BlogPost;

  const mockActivatedRoute = {
    data: of({ blogPost: mockBlogPost }),
    snapshot: {
      params: {
        slug: 'test-slug',
      },
    },
  };

  const mockActivatedRouteError = {
    data: of('Error'),
  };

  describe('default component configuration', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [BlogPostComponent],
        imports: [RouterModule.forRoot([])],
        providers: [
          { provide: ActivatedRoute, useValue: mockActivatedRoute },
          { provide: PLATFORM_ID, useValue: 'browser' },
        ],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(BlogPostComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      mockPost = mockBlogPost;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should set data from service', () => {
      component.setBlogListData(mockPost);
      expect(component.meta).toBeTruthy();
      expect(component.post).toBeTruthy();
    });

    it('should not transform body when post is undefined', () => {
      component.body = undefined;
      component.post = undefined;
      component.transformBody();
      expect(component.body).toBeUndefined();
    });

    it('should set publish date', () => {
      component.post = mockPost?.data?.data;
      expect('October 01, 2020').toBe(component.getPublishedDate());
    });

    it('should get slug from the activatedRoute params', () => {
      expect(component.slug).toBe('test-slug');
    });

    it('should set page scroll to true on scroll', () => {
      spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(80);
      spyOnProperty(window, 'innerHeight', 'get').and.returnValue(70);
      component.handleScroll();
      expect(component.pageScrolled).toBeTruthy();
    });

    it('should set page scroll to false when offset still shows top of page', () => {
      spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(80);
      spyOnProperty(window, 'innerHeight', 'get').and.returnValue(81);
      component.handleScroll();
      expect(component.pageScrolled).toBeFalsy();
    });

    it('should get post', async () => {
      const butterService = TestBed.inject(ButterApiService);
      spyOn(butterService, 'getPost').and.returnValue(
        Promise.resolve(mockBlogPost)
      );
      spyOn(component, 'setBlogListData');
      await component.getPost();
      expect(component.setBlogListData).toHaveBeenCalled();
    });

    it('should set state to error on response error', fakeAsync(() => {
      const butterService = TestBed.inject(ButterApiService);
      spyOn(butterService, 'getPost').and.returnValue(
        Promise.reject(new Error(''))
      );
      component.getPost();
      flushMicrotasks();
      expect(component.blogPostStatus).toBe(State.Error);
    }));

    it('should get related post from each post tag', () => {
      // tslint:disable-next-line: no-non-null-assertion
      component.post!.tags = mockTags;
      spyOn(component, 'getRelatedPosts');
      component.getRelatedPostsFromTags();

      expect(component.getRelatedPosts).toHaveBeenCalledTimes(2);
    });

    it('should get related post', async () => {
      const butterService = TestBed.inject(ButterApiService);
      spyOn(butterService, 'getList').and.returnValue(
        Promise.resolve(mockBlogList)
      );

      // tslint:disable-next-line: no-non-null-assertion
      component.post!.tags = mockTags;
      await component.getRelatedPosts(mockTags[0].slug);
      expect(component.relatedPosts).toHaveSize(1);
    });

    it('should not have duplicate related posts', async () => {
      const butterService = TestBed.inject(ButterApiService);
      const mockBlogListWithTag = mockBlogList;
      // tslint:disable-next-line: no-non-null-assertion
      mockBlogListWithTag.data!.data[0].slug = mockTags[0].slug;
      spyOn(butterService, 'getList').and.returnValue(
        Promise.resolve(mockBlogListWithTag)
      );

      // tslint:disable-next-line: no-non-null-assertion
      component.post!.tags = mockTags;
      component.relatedPosts = [
        {
          slug: mockTags[0].slug,
          name: '',
        },
      ];
      await component.getRelatedPosts(mockTags[0].slug);
      expect(component.relatedPosts).toHaveSize(1);
    });

    it('should scroll back to top', () => {
      spyOn(window, 'scrollTo');
      component.backToTop();

      expect(window.scrollTo).toHaveBeenCalledTimes(1);
    });
  });

  describe('component resolver error', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [BlogPostComponent],
        providers: [
          { provide: ActivatedRoute, useValue: mockActivatedRouteError },
        ],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(BlogPostComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should set status to error', () => {
      expect(component.blogPostStatus).toBe(State.Error);
    });
  });
});
